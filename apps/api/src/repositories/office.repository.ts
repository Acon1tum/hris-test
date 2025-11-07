import { prisma } from '@hris/database';
import type { Office } from '@hris/database';
import { BaseRepository } from './base.repository';

export class OfficeRepository extends BaseRepository<Office> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.office {
    return this.prisma.office;
  }

  async findByName(name: string) {
    return this.prisma.office.findFirst({
      where: { name },
      include: {
        phoneNumbers: true,
        emailAddresses: true,
      },
    });
  }

  async findActive() {
    return this.prisma.office.findMany({
      where: { isActive: true },
      include: {
        phoneNumbers: true,
        emailAddresses: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.prisma.office.findUnique({
      where: { id },
      include: {
        phoneNumbers: true,
        emailAddresses: true,
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

  async createWithRelations(data: {
    name: string;
    branchName?: string | null;
    description?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    barangay?: string | null;
    city: string;
    province: string;
    region: string;
    zipCode: string;
    country?: string;
    isActive?: boolean;
    phoneNumbers?: Array<{
      countryCode: string;
      number: string;
      type?: string | null;
      isPrimary?: boolean;
    }>;
    emailAddresses?: Array<{
      email: string;
      type?: string | null;
      isPrimary?: boolean;
    }>;
  }) {
    const { phoneNumbers, emailAddresses, ...officeData } = data;

    return this.prisma.office.create({
      data: {
        ...officeData,
        phoneNumbers: phoneNumbers
          ? {
              create: phoneNumbers,
            }
          : undefined,
        emailAddresses: emailAddresses
          ? {
              create: emailAddresses,
            }
          : undefined,
      },
      include: {
        phoneNumbers: true,
        emailAddresses: true,
      },
    });
  }

  async updateWithRelations(
    id: string,
    data: {
      name?: string;
      branchName?: string | null;
      description?: string | null;
      addressLine1?: string;
      addressLine2?: string | null;
      barangay?: string | null;
      city?: string;
      province?: string;
      region?: string;
      zipCode?: string;
      country?: string;
      isActive?: boolean;
      phoneNumbers?: Array<{
        id?: string;
        countryCode?: string;
        number?: string;
        type?: string | null;
        isPrimary?: boolean;
      }>;
      emailAddresses?: Array<{
        id?: string;
        email?: string;
        type?: string | null;
        isPrimary?: boolean;
      }>;
    }
  ) {
    const { phoneNumbers, emailAddresses, ...officeData } = data;

    // Prepare update data
    const updateData: any = { ...officeData };

    // Only update phone numbers if provided
    if (phoneNumbers !== undefined) {
      // Delete existing phone numbers
      await this.prisma.officePhone.deleteMany({
        where: { officeId: id },
      });

      // Create new phone numbers if any are provided
      if (phoneNumbers.length > 0) {
        updateData.phoneNumbers = {
          create: phoneNumbers
            .filter((phone) => phone.number && phone.number.trim() !== '')
            .map((phone) => ({
              countryCode: phone.countryCode || '+63',
              number: phone.number || '',
              type: phone.type || null,
              isPrimary: phone.isPrimary || false,
            })),
        };
      }
    }

    // Only update email addresses if provided
    if (emailAddresses !== undefined) {
      // Delete existing email addresses
      await this.prisma.officeEmail.deleteMany({
        where: { officeId: id },
      });

      // Create new email addresses if any are provided
      if (emailAddresses.length > 0) {
        updateData.emailAddresses = {
          create: emailAddresses
            .filter((email) => email.email && email.email.trim() !== '')
            .map((email) => ({
              email: email.email || '',
              type: email.type || null,
              isPrimary: email.isPrimary || false,
            })),
        };
      }
    }

    return this.prisma.office.update({
      where: { id },
      data: updateData,
      include: {
        phoneNumbers: true,
        emailAddresses: true,
      },
    });
  }
}

