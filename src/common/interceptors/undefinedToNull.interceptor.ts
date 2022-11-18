import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * 인터셉터 -> AOP의 역할
 */
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 컨트롤러 가기 전 부분

    // data -> 컨트롤러에서 리턴해주는 데이터
    // 아래는 공식문서 내용
    // return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' })));

    // json에서는 undefined를 인식못하고 에러를 뱉기 때문에 null로 바꿔줌
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));

    // 컨트롤러 다녀온 이후 부분
  }
}
