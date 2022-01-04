import { BadRequestException } from '@nestjs/common';
import { GenderType } from '../entities/student.entity';
import { StudentGenderValidatorPipe } from './student-gender-validator.pipe';

describe('StudentGenderValidatorPipe', () => {
  let target: StudentGenderValidatorPipe;

  beforeEach(() => {
    target = new StudentGenderValidatorPipe();
  });

  it('should be defined', () => {
    expect(new StudentGenderValidatorPipe()).toBeDefined();
  });

  it('validate gender', async () => {
    const dto = {
      name: 'Raja',
      gender: GenderType.MALE,
    };

    const errorDto = {
      name: 'Raja',
      gender: 'Other',
    };

    expect(await target.transform(dto, {} as any)).toEqual(dto);

    expect(() => target.transform(errorDto, {} as any)).toThrowError(
      new BadRequestException(`${errorDto.gender} is not a valid gender`),
    );
  });
});
