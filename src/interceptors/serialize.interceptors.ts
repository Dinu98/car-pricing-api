import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    //Run before request is handled by route handler
    console.log('Before request handling: ', context);

    return next.handle().pipe(
      map((data: any) => {
        //Run before response is sent
        console.log('Before response is sent: ', data);
      })
    );
  }
}
