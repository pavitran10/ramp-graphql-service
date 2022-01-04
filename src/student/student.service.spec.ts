import { Student } from './entities/student.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import {
  studentCreateStub,
  studentStub,
  wrongStudentStub,
  studentUpdateStub,
  wrongStudentUpdateStub,
  studentsBulkCreateStub,
} from './stubs/student.stubs';
import { NotFoundException } from '@nestjs/common';

describe('StudentService', () => {
  let service: StudentService;

  const createDto = studentCreateStub;

  const createBulkDto = studentsBulkCreateStub;

  const updateDto = studentUpdateStub;
  const wrongUpdateDto = wrongStudentUpdateStub;

  const students: Student[] = [studentStub];
  const wrongStudent = wrongStudentStub;

  const studentRepository = {
    create: jest.fn().mockImplementation((payload) => payload),
    save: jest.fn((input) => {
      if (Array.isArray(input)) {
        const array = [];
        for (const i of input) {
          const object = {
            id: 1,
            ...i,
          };
          array.push(object);
        }
        return array;
      } else {
        const result = {
          id: 1,
          ...input,
        };
        return result;
      }
    }),
    find: jest.fn().mockResolvedValue(students),
    findOne: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(students.find((stu) => stu.id == id)),
      ),
    delete: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(students.find((stu) => stu.id == id)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new student', async () => {
    expect(await service.create(createDto)).toEqual({
      id: 1,
      ...createDto,
      age: age(createDto.dob),
    });
  });

  it('should create new students as bulk', async () => {
    expect(await service.createBulk(createBulkDto)).toEqual(
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
  });

  it('should update student', async () => {
    expect(await service.update(updateDto.id, updateDto)).toEqual({
      ...updateDto,
      age: age(updateDto.dob),
    });

    expect(() =>
      service.update(wrongUpdateDto.id, wrongUpdateDto),
    ).rejects.toThrowError(
      new NotFoundException(`Record cannot find by id ${wrongUpdateDto.id}`),
    );
  });

  it('should delete student', async () => {
    expect(await service.remove(studentStub.id)).toEqual({
      ...studentStub,
    });

    expect(() => service.remove(wrongStudent.id)).rejects.toThrowError(
      new NotFoundException(`Record cannot find by id ${wrongStudent.id}`),
    );
  });

  it('should return all students', async () => {
    expect(await service.findAll()).toEqual(students);
  });

  it('should return student with same id', async () => {
    expect(await service.findOne(studentStub.id)).toEqual(studentStub);

    expect(() => service.findOne(wrongStudent.id)).rejects.toThrowError(
      new NotFoundException(`Record cannot find by id ${wrongStudent.id}`),
    );
  });
});

function age(dob: Date) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
