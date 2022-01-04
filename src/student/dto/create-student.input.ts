import { InputType, Field } from '@nestjs/graphql';
import { GenderType } from '../entities/student.entity';

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;
  @Field()
  gender: GenderType;
  @Field()
  address: string;
  @Field()
  mobile_no: string;
  @Field()
  dob: Date;
}
