import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // console.log 대신 logger 사용
  private logger = new Logger('HTTP');

  // 라우터보다 먼저 실행
  use(request: Request, response: Response, next: NextFunction): void {
    // 실행순서 1)
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      // 라우트 끝나고 실행
      // 실행순서 3)
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl}, ${statusCode} ${contentLength} ${userAgent} ${ip}`,
      );
    });

    // 실행순서 2)
    next();
  }
}
