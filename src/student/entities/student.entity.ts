import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderType {
  MALE = 'Male',
  FEMALE = 'Female',
}

@ObjectType()
@Entity()
export class Student {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  gender: string;
  @Field()
  @Column()
  address: string;
  @Field()
  @Column('varchar', { length: 10 })
  mobile_no: string;
  @Field()
  @Column()
  dob: Date;
  @Field(() => Int)
  age: number;
}

export class StudentData {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile_no: string;
  dob: Date;
  age: number;
}
