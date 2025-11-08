import { holidayRepository } from '../../repositories';
import { ApiError } from '../../utils/errors';
import { CreateHolidayDto, UpdateHolidayDto } from './dto';

export class HolidayService {
  async create(dto: CreateHolidayDto) {
    const date = typeof dto.date === 'string' ? new Date(dto.date) : dto.date;
    
    // Check if holiday already exists for this name, date, and year
    const existing = await holidayRepository.findMany({
      name: dto.name,
      date: date,
      year: dto.year,
    });

    if (existing && existing.length > 0) {
      throw new ApiError(400, 'Holiday with this name, date, and year already exists');
    }

    return holidayRepository.create({
      ...dto,
      date: date,
    });
  }

  async getAll() {
    return holidayRepository.findMany(
      undefined,
      undefined,
      { date: 'asc' },
      undefined,
      undefined
    );
  }

  async getById(id: string) {
    const holiday = await holidayRepository.findById(id);
    if (!holiday) {
      throw new ApiError(404, 'Holiday not found');
    }
    return holiday;
  }

  async getByYear(year: number) {
    return holidayRepository.findByYear(year);
  }

  async getByDateRange(startDate: Date, endDate: Date) {
    return holidayRepository.findByDateRange(startDate, endDate);
  }

  async update(id: string, dto: UpdateHolidayDto) {
    const holiday = await holidayRepository.findById(id);
    if (!holiday) {
      throw new ApiError(404, 'Holiday not found');
    }

    const updateData: any = { ...dto };
    if (dto.date) {
      updateData.date = typeof dto.date === 'string' ? new Date(dto.date) : dto.date;
    }

    return holidayRepository.update(id, updateData);
  }

  async delete(id: string) {
    const holiday = await holidayRepository.findById(id);
    if (!holiday) {
      throw new ApiError(404, 'Holiday not found');
    }

    await holidayRepository.delete(id);
    return { message: 'Holiday deleted successfully' };
  }
}

