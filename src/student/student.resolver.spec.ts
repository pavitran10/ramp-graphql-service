import { Test, TestingModule } from '@nestjs/testing';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import {
  studentCreateStub,
  studentsBulkCreateStub,
  studentStub,
  studentUpdateStub,
} from './stubs/student.stubs';
import { Student } from './entities/student.entity';

describe('StudentResolver', () => {
  let resolver: StudentResolver;
  let stuMockService: StudentService;

  const createDto = studentCreateStub;

  const createBulkDto = studentsBulkCreateStub;

  const updateDto = studentUpdateStub;

  const student = studentStub;

  const students: Student[] = [studentStub];

  const studentService = {
    create: jest.fn((dto) => {
      return {
        id: 8,
        ...dto,
        age: age(dto.dob),
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
      age: age(dto.dob),
    })),
    findAll: jest.fn().mockResolvedValue(students),
    findOne: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(students.find((stu) => stu.id == id)),
      ),
    remove: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(students.find((stu) => stu.id == id)),
      ),
    createBulk: jest.fn((dto) => {
      const array = [];
      for (const i of dto) {
        const object = {
          id: 1,
          ...i,
          age: age(i.dob),
        };
        array.push(object);
      }
      return array;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useValue: studentService,
        },
      ],
    }).compile();

    resolver = module.get<StudentResolver>(StudentResolver);
    stuMockService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createStudent).toBeDefined();
  });

  it('should create student and return with student details', () => {
    expect(resolver.createStudent(createDto)).toEqual({
      id: 8,
      ...createDto,
      age: age(createDto.dob),
    });
    expect(stuMockService.create).toBeCalledWith(createDto);
  });

  it('should create bulk students and return with their all details', () => {
    expect(resolver.createStudentsBulk(createBulkDto)).toEqual(
      createBulkDto.map((dto) => {
        let object = Object.assign({});
        object = {
          id: 1,
          ...dto,
          age: age(dto.dob),
        };
        return object;
      }),
    );
    expect(stuMockService.createBulk).toBeCalledWith(createBulkDto);
  });

  it('should update student', () => {
    expect(resolver.updateStudent(updateDto)).toEqual({
      ...updateDto,
      age: age(updateDto.dob),
    });
    expect(stuMockService.update).toBeCalledWith(updateDto.id, updateDto);
  });

  it('should return all students', () => {
    expect(resolver.findAll()).resolves.toEqual(students);
  });

  it('should return a single student', () => {
    expect(resolver.findOne(student.id)).resolves.toEqual(student);
  });

  it('should remove student', () => {
    expect(resolver.removeStudent(student.id)).resolves.toEqual({
      ...student,
    });
    expect(stuMockService.remove).toBeCalledWith(student.id);
  });
});

function age(dob: Date) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
