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
          console.log('--------- Enter FindFirst -----------');
          params.action = 'findFirst';
          console.log('find first args', params.args);
          if (params.args.where?.NOT?.deletedAt === null) {
            console.log('findFirst - route not adding filter on deletedAt == null');
            return next(params);
          }
          params.args.where['deletedAt'] = null;
          console.log('find first args at exit', params.args);
          console.log('--------- Exit FindFirst -----------');
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
          console.log('--------- Enter UpdateMany -----------');
          if (params.args.where != undefined) {
            console.log('updateMany args', params.args);
            if (params.args.where?.NOT?.deletedAt === null) {
              console.log('updateMany - route not adding filter on deletedAt == null');
              return next(params);
            }
            params.args.where['deletedAt'] = null;
          } else {
            params.args['where'] = { deletedAt: null };
          }
          console.log('--------- Exit UpdateMany -----------');
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
