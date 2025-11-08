import { prisma } from '@hris/database';
import type { Department } from '@hris/database';
import type { Prisma } from '@hris/database';
import { BaseRepository } from './base.repository';

type DepartmentWithRelations = Prisma.DepartmentGetPayload<{
  include: {
    parentDepartment: true;
    office: true;
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
  };
}>;

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

export class DepartmentRepository extends BaseRepository<Department> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.department {
    return this.prisma.department;
  }

  async findByName(name: string): Promise<DepartmentWithRelations | null> {
    return this.prisma.department.findUnique({
      where: { name },
      include: {
        parentDepartment: true,
        office: true,
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
    });
  }

  async findByCode(code: string): Promise<DepartmentWithRelations | null> {
    return this.prisma.department.findUnique({
      where: { code },
      include: {
        parentDepartment: true,
        office: true,
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
    });
  }

  async findActive(): Promise<DepartmentWithRelations[]> {
    return this.prisma.department.findMany({
      where: { isActive: true },
      include: {
        parentDepartment: true,
        office: true,
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
      orderBy: { name: 'asc' },
    });
  }

  async findByIdWithRelations(id: string): Promise<DepartmentWithFullRelations | null> {
    return this.prisma.department.findUnique({
      where: { id },
      include: {
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
        subDepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        employees: {
          select: {
            id: true,
            employeeNumber: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findMany(where?: any, include?: any, orderBy?: any, skip?: number, take?: number): Promise<any[]> {
    return this.model.findMany({
      where,
      include: include || {
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
      orderBy: orderBy || { createdAt: 'desc' },
      skip,
      take,
    });
  }
}

