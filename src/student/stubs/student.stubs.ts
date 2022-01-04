import { UpdateStudentInput } from '../dto/update-student.input';
import { CreateStudentInput } from './../dto/create-student.input';
import { GenderType, Student } from './../entities/student.entity';
export const studentStub: Student = {
  id: 1,
  name: 'Rajah',
  gender: GenderType.MALE,
  address: 'Colombo',
  mobile_no: '0123456789',
  dob: new Date(1993, 10, 8),
  age: new Date().getFullYear() - new Date(1993, 10, 8).getFullYear(),
};

export const wrongStudentStub: Student = {
  id: 2,
  name: 'Rajah',
  gender: GenderType.MALE,
  address: 'Colombo',
  mobile_no: '0123456789',
  dob: new Date(1993, 10, 8),
  age: new Date().getFullYear() - new Date(1993, 10, 8).getFullYear(),
};

export const studentCreateStub: CreateStudentInput = {
  name: 'Rajah',
  gender: GenderType.MALE,
  address: 'Colombo',
  mobile_no: '0123456789',
  dob: new Date(1993, 10, 8),
};

export const studentsBulkCreateStub: CreateStudentInput[] = [
  {
    name: 'Rajah',
    gender: GenderType.MALE,
    address: 'Colombo',
    mobile_no: '0123456789',
    dob: new Date(1993, 10, 8),
  },
  {
    name: 'Mala',
    gender: GenderType.FEMALE,
    address: 'Colombo',
    mobile_no: '0123456789',
    dob: new Date(1993, 10, 8),
  },
];

export const studentUpdateStub: UpdateStudentInput = {
  id: 1,
  name: 'Rajah',
  gender: GenderType.MALE,
  address: 'Jaffna',
  mobile_no: '0123456789',
  dob: new Date(1970, 10, 8),
};

export const wrongStudentUpdateStub: UpdateStudentInput = {
  id: 2,
  name: 'Kamala',
  gender: GenderType.FEMALE,
  address: 'Jaffna',
  mobile_no: '0123456789',
  dob: new Date(1970, 10, 8),
};
