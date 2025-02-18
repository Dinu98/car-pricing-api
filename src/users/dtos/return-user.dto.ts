import { Expose } from 'class-transformer';

export class ReturnUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}
