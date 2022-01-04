import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentGenderValidatorPipe } from './pipes/student-gender-validator.pipe';
import { StudentMobileNoValidatorPipe } from './pipes/student-mobile-no-validator.pipe';
import { Logger } from '@nestjs/common';
import { StudentsBulkGenderValidatorPipe } from './pipes/students-bulk-gender-validator.pipe';
import { StudentsBulkMobileNoValidatorPipe } from './pipes/students-bulk-mobile-no-validator.pipe';

@Resolver(() => Student)
export class StudentResolver {
  Query: any;
  constructor(private readonly studentService: StudentService) {}

  private logger: Logger = new Logger(StudentResolver.name);

  @Mutation(() => Student, { name: 'createStudent' })
  createStudent(
    @Args(
      'createStudentInput',
      new StudentGenderValidatorPipe(),
      new StudentMobileNoValidatorPipe(),
    )
    createStudentInput: CreateStudentInput,
  ) {
    this.logger.log('createStudent Mutation');
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [Student], { name: 'students' })
  findAll() {
    this.logger.log('findAll Query');
    return this.studentService.findAll();
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    this.logger.log('findOne Query');
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  updateStudent(
    @Args(
      'updateStudentInput',
      new StudentGenderValidatorPipe(),
      new StudentMobileNoValidatorPipe(),
    )
    updateStudentInput: UpdateStudentInput,
  ) {
    this.logger.log('updateStudent Mutation');
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student, { name: 'removeStudent' })
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    this.logger.log('remove Mutation');
    return this.studentService.remove(id);
  }

  @Mutation(() => [Student], { name: 'createStudentsBulk' })
  createStudentsBulk(
    @Args(
      'createStudentsBulkInput',
      { type: () => [CreateStudentInput] },
      new StudentsBulkGenderValidatorPipe(),
      new StudentsBulkMobileNoValidatorPipe(),
    )
    createStudentsBulkInput: CreateStudentInput[],
  ) {
    this.logger.log('createStudentsBulk Mutation');
    return this.studentService.createBulk(createStudentsBulkInput);
  }
}
