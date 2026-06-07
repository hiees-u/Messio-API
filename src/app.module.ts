import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { FacebookModule } from './modules/auth/facebook/facebook.module';
import { FacebooksModule } from './modules/facebooks/facebooks.module';
import { CryptoModule } from './common/crypto/crypto.module';
import { AuthModule } from './common/auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    FacebookModule,
    FacebooksModule,
    CryptoModule,
    AuthModule,
    RedisModule,
    WebhooksModule,
    ChatsModule,
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
