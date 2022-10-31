import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    Logger.log('Prisma connected', 'Prisma');

    this.$use(async (params, next) => {
      if (params.model == 'Stock') {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst';
          if (params.args.where?.NOT?.deletedAt === null) {
            return next(params);
          }
          params.args.where['deletedAt'] = null;
        }
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.deletedAt == null) {
              params.args.where['deletedAt'] = null;
            }
          } else {
            params.args['where'] = { deletedAt: null };
          }
        }
      }
      return next(params);
    });

    this.$use(async (params, next) => {
      if (params.model == 'Stock') {
        if (params.action == 'update') {
          params.action = 'updateMany';
          params.args.where['deletedAt'] = null;
        }
        if (params.action == 'updateMany') {
          if (params.args.where != undefined) {
            if (params.args.where?.NOT?.deletedAt === null) {
              return next(params);
            }
            params.args.where['deletedAt'] = null;
          } else {
            params.args['where'] = { deletedAt: null };
          }
        }
      }
      return next(params);
    });

    this.$use(async (params, next) => {
      if (params.model == 'Stock') {
        if (params.action == 'delete') {
          params.action = 'update';
          params.args['data'] = { deletedAt: new Date() };
        }
        if (params.action == 'deleteMany') {
          params.action = 'updateMany';
          params.args['data'] = { deletedAt: new Date() };
        }
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
