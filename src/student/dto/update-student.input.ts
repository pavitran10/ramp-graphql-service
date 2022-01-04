import { CreateStudentInput } from './create-student.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GenderType } from '../entities/student.entity';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => Int)
  id: number;
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
