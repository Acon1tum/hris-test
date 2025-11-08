import { departmentRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { prisma } from '@hris/database';
import type { Prisma } from '@hris/database';

type DepartmentWithFullRelations = Prisma.DepartmentGetPayload<{
  include: {
    parentDepartment: {
      select: {
        id: true;
        name: true;
        code: true;
      };
    };
    office: {
      select: {
        id: true;
        name: true;
        city: true;
        province: true;
      };
    };
    departmentHead: {
      include: {
        user: {
          select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
          };
        };
      };
    };
    subDepartments: {
      select: {
        id: true;
        name: true;
        code: true;
      };
    };
    employees: {
      select: {
        id: true;
        employeeNumber: true;
        user: {
          select: {
            firstName: true;
            lastName: true;
            email: true;
          };
        };
      };
    };
  };
}>;

export class DepartmentService {
  async create(dto: CreateDepartmentDto) {
    // Check if department with same name already exists
    const existingByName = await departmentRepository.findByName(dto.name);
    if (existingByName) {
      throw new ApiError(400, 'Department with this name already exists');
    }

    // Check if department with same code already exists
    const existingByCode = await departmentRepository.findByCode(dto.code);
    if (existingByCode) {
      throw new ApiError(400, 'Department with this code already exists');
    }

    // Validate parent department if provided
    if (dto.parentDepartmentId) {
      const parentDepartment = await departmentRepository.findById(dto.parentDepartmentId);
      if (!parentDepartment) {
        throw new ApiError(400, 'Parent department not found');
      }
      // Prevent circular reference - check if parent is a subdepartment of this department
      if (parentDepartment.id === dto.parentDepartmentId) {
        throw new ApiError(400, 'Department cannot be its own parent');
      }
    }

    // Validate office if provided
    if (dto.officeId) {
      const { officeRepository } = await import('../../repositories');
      const office = await officeRepository.findById(dto.officeId);
      if (!office) {
        throw new ApiError(400, 'Office not found');
      }
    }

    // Validate department head (employee) if provided
    if (dto.departmentHeadId) {
      const employee = await prisma.employee.findUnique({
        where: { id: dto.departmentHeadId },
      });
      if (!employee) {
        throw new ApiError(400, 'Employee (department head) not found');
      }
    }

    return departmentRepository.create(dto);
  }

  async getAll() {
    return departmentRepository.findMany(
      undefined,
      {
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
            city: true,
            province: true,
          },
        },
        departmentHead: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      { createdAt: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string): Promise<DepartmentWithFullRelations> {
    const department = await departmentRepository.findByIdWithRelations(id);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }
    return department;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

    // Check if name is being changed and if it conflicts
    if (dto.name && dto.name !== department.name) {
      const existing = await departmentRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Department with this name already exists');
      }
    }

    // Check if code is being changed and if it conflicts
    if (dto.code && dto.code !== department.code) {
      const existing = await departmentRepository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Department with this code already exists');
      }
    }

    // Validate parent department if provided
    if (dto.parentDepartmentId !== undefined) {
      if (dto.parentDepartmentId) {
        const parentDepartment = await departmentRepository.findById(dto.parentDepartmentId);
        if (!parentDepartment) {
          throw new ApiError(400, 'Parent department not found');
        }
        // Prevent circular reference
        if (parentDepartment.id === id) {
          throw new ApiError(400, 'Department cannot be its own parent');
        }
        // Prevent making a department its own ancestor
        const isAncestor = await this.checkIfAncestor(id, dto.parentDepartmentId);
        if (isAncestor) {
          throw new ApiError(400, 'Cannot set parent department as it would create a circular reference');
        }
      }
    }

    // Validate office if provided
    if (dto.officeId !== undefined && dto.officeId) {
      const { officeRepository } = await import('../../repositories');
      const office = await officeRepository.findById(dto.officeId);
      if (!office) {
        throw new ApiError(400, 'Office not found');
      }
    }

    // Validate department head (employee) if provided
    if (dto.departmentHeadId !== undefined && dto.departmentHeadId) {
      const employee = await prisma.employee.findUnique({
        where: { id: dto.departmentHeadId },
      });
      if (!employee) {
        throw new ApiError(400, 'Employee (department head) not found');
      }
    }

    return departmentRepository.update(id, dto);
  }

  async delete(id: string) {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

    // Check if department has sub-departments
    const departmentWithRelations = await departmentRepository.findByIdWithRelations(id);
    if (departmentWithRelations && departmentWithRelations.subDepartments.length > 0) {
      throw new ApiError(400, 'Cannot delete department with sub-departments. Please reassign or delete sub-departments first.');
    }

    // Check if department has employees
    if (departmentWithRelations && departmentWithRelations.employees.length > 0) {
      throw new ApiError(400, 'Cannot delete department with assigned employees. Please reassign employees first.');
    }

    await departmentRepository.delete(id);
    return { message: 'Department deleted successfully' };
  }

  // Helper method to check if a department is an ancestor of another
  private async checkIfAncestor(departmentId: string, potentialAncestorId: string): Promise<boolean> {
    const department = await departmentRepository.findById(potentialAncestorId);
    if (!department || !department.parentDepartmentId) {
      return false;
    }
    if (department.parentDepartmentId === departmentId) {
      return true;
    }
    return this.checkIfAncestor(departmentId, department.parentDepartmentId);
  }
}

