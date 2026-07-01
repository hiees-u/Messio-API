import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CryptoModule } from './infrastructure/crypto/crypto.module';
import { RedisModule } from './infrastructure/redis/redis.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModuleCommon } from './common/auth/auth.module';

import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { ChatsModule } from './modules/chats/chats.module';
import { CustomerModule } from './modules/chats/customer/customer.module';
import { FacebookModulee } from './providers/facebook/facebook.module';
import { AuthModule } from './modules/auth/auth.module';
import { PagesModule } from './modules/pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    CryptoModule,
    AuthModuleCommon,
    AuthModule,
    RedisModule,
    WebhooksModule,
    ChatsModule,
    CustomerModule,
    FacebookModulee,
    PagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
