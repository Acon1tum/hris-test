import { payrollConfigRepository, organizationRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreatePayrollConfigDto, UpdatePayrollConfigDto } from './dto';

export class PayrollConfigService {
  async create(dto: CreatePayrollConfigDto) {
    if (dto.organizationId) {
      const organization = await organizationRepository.findById(dto.organizationId);
      if (!organization) {
        throw new ApiError(400, 'Organization not found');
      }
    }

    return payrollConfigRepository.create(dto);
  }

  async getAll() {
    return payrollConfigRepository.findMany(
      undefined,
      {
        organization: true,
      },
      { createdAt: 'desc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const payrollConfig = await payrollConfigRepository.findById(id);
    if (!payrollConfig) {
      throw new ApiError(404, 'Payroll config not found');
    }
    return payrollConfig;
  }

  async getByOrganization(organizationId: string) {
    const payrollConfigs = await payrollConfigRepository.findByOrganization(organizationId);
    return payrollConfigs;
  }

  async update(id: string, dto: UpdatePayrollConfigDto) {
    const payrollConfig = await payrollConfigRepository.findById(id);
    if (!payrollConfig) {
      throw new ApiError(404, 'Payroll config not found');
    }

    if (dto.organizationId) {
      const organization = await organizationRepository.findById(dto.organizationId);
      if (!organization) {
        throw new ApiError(400, 'Organization not found');
      }
    }

    return payrollConfigRepository.update(id, dto);
  }

  async delete(id: string) {
    const payrollConfig = await payrollConfigRepository.findById(id);
    if (!payrollConfig) {
      throw new ApiError(404, 'Payroll config not found');
    }

    await payrollConfigRepository.delete(id);
    return { message: 'Payroll config deleted successfully' };
  }
}


