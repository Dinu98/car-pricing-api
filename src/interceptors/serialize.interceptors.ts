import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

//This interaces describes that the type
//Needs to be a class, any class
//So we can't pass string, numbers etc...
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

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
