import { Student, StudentData } from './entities/student.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  private logger: Logger = new Logger(StudentService.name);

  async create(createStudentInput: CreateStudentInput): Promise<StudentData> {
    this.logger.log('create function');
    const today = new Date();
    const birthDate = new Date(createStudentInput.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const stu = await this.studentRepository.create(createStudentInput);
    const student = await this.studentRepository.save(stu);
    const studentData: StudentData = {
      ...student,
      age,
    };
    return studentData;
  }

  async createBulk(
    createStudentsInput: CreateStudentInput[],
  ): Promise<StudentData[]> {
    this.logger.log('createBulk function');
    const stu = await this.studentRepository.create(createStudentsInput);
    const students = await this.studentRepository.save(stu);
    const studentsData: StudentData[] = [];
    for (const student of students) {
      const today = new Date();
      const birthDate = new Date(student.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const data: StudentData = {
        ...student,
        age,
      };
      studentsData.push(data);
    }
    return studentsData;
  }

  async findAll(): Promise<StudentData[]> {
    this.logger.log('findAll function');
    const students = await this.studentRepository.find();
    const studentsData: StudentData[] = [];
    for (const student of students) {
      const today = new Date();
      const birthDate = new Date(student.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const data: StudentData = {
        ...student,
        age,
      };
      studentsData.push(data);
    }
    return studentsData;
  }

  async findOne(id: number): Promise<StudentData> {
    this.logger.log('findOne function');
    const stu = await this.studentRepository.findOne(id);
    if (!stu) {
      this.logger.error(`Record cannot find by id ${id}`);
      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
    const today = new Date();
    const birthDate = new Date(stu.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const studentData: StudentData = {
      ...stu,
      age,
    };
    return studentData;
  }

  async update(
    id: number,
    updateStudentInput: UpdateStudentInput,
  ): Promise<StudentData> {
    this.logger.log('update function');
    const stuSearch = await this.studentRepository.findOne(id);
    if (!stuSearch) {
      this.logger.error(`Record cannot find by id ${id}`);
      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
    const today = new Date();
    const birthDate = new Date(updateStudentInput.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const stu = await this.studentRepository.create(updateStudentInput);
    stu.id = id;
    const student = await this.studentRepository.save(stu);
    const studentData: StudentData = {
      ...student,
      age,
    };
    return studentData;
  }

  async remove(id: number): Promise<StudentData> {
    this.logger.log('remove function');
    const stu = await this.studentRepository.findOne(id);
    if (stu) {
      await this.studentRepository.delete(id);
      const today = new Date();
      const birthDate = new Date(stu.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const studentData: StudentData = {
        ...stu,
        age,
      };
      return studentData;
    } else {
      this.logger.error(`Record cannot find by id ${id}`);
      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
  }
}
