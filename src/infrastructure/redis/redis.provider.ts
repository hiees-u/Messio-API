import Redis from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 9000,
      username: process.env.REDIS_USER_NAME,
      password: process.env.REDIS_PASSWORD,
      maxLoadingRetryTime: 0,
    });
  },
};
