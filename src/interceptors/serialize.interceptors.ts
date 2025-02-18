import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    //Run before request is handled by route handler
    //console.log('Before request handling: ', context);

    return next.handle().pipe(
      map((data: any) => {
        //Run before response is sent
        //console.log('Before response is sent: ', data);
        return plainToClass(this.dto, data, {
          //This setting is making sure that only properties
          //Marked with @Expose() are gonna be kept
          excludeExtraneousValues: true
        });
      })
    );
  }
}
