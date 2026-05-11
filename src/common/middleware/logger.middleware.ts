import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`[${req.method}] ${req.originalUrl}`);
    console.log('Respose: ');
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    next();
  }
}
