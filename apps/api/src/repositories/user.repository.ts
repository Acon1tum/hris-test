import { prisma } from '@hris/database';
import type { User } from '@hris/database';
import type { Prisma } from '@hris/database';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor(prismaInstance: typeof prisma = prisma) {
    super(prismaInstance);
  }

  get model(): typeof prisma.user {
    return this.prisma.user;
  }

  async findByEmail(email: string): Promise<User | null>;
  async findByEmail(
    email: string,
    includeRolesAndPermissions: true
  ): Promise<Prisma.UserGetPayload<{
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: { permission: true };
              };
              roleModules: {
                include: { module: true };
              };
            };
          };
        };
      };
    };
  }> | null>;
  async findByEmail(
    email: string,
    includeRolesAndPermissions?: boolean
  ): Promise<User | Prisma.UserGetPayload<{
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: { permission: true };
              };
              roleModules: {
                include: { module: true };
              };
            };
          };
        };
      };
    };
  }> | null> {
    if (includeRolesAndPermissions) {
      return this.prisma.user.findUnique({
        where: { email },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: { permission: true },
                  },
                  roleModules: {
                    include: { module: true },
                  },
                },
              },
            },
          },
        },
      });
    }
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByIdWithRolesAndPermissions(id: string): Promise<Prisma.UserGetPayload<{
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: { permission: true };
              };
              roleModules: {
                include: { module: true };
              };
            };
          };
        };
      };
    };
  }> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: { permission: true },
                },
                roleModules: {
                  include: { module: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateLastLogin(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  async getUserRoles(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true },
            },
            roleModules: {
              where: { canAccess: true },
              include: { module: true },
            },
          },
        },
      },
    });
  }

  async createUserRole(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }

  async deleteUserRoles(userId: string) {
    return this.prisma.userRole.deleteMany({
      where: { userId },
    });
  }

  async createUserRoles(userId: string, roleIds: string[]) {
    return this.prisma.userRole.createMany({
      data: roleIds.map((roleId) => ({
        userId,
        roleId,
      })),
    });
  }
}

