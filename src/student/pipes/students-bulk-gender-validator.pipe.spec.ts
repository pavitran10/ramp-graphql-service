import { BadRequestException } from '@nestjs/common';
import { GenderType } from '../entities/student.entity';
import { StudentsBulkGenderValidatorPipe } from './students-bulk-gender-validator.pipe';

describe('StudentsBulkGenderValidatorPipe', () => {
  let target: StudentsBulkGenderValidatorPipe;

  beforeEach(() => {
    target = new StudentsBulkGenderValidatorPipe();
  });

  it('should be defined', () => {
    expect(new StudentsBulkGenderValidatorPipe()).toBeDefined();
  });

  it('validate gender', async () => {
    const dto = [
      {
        name: 'Raja',
        gender: GenderType.MALE,
      },
      {
        name: 'Mala',
        gender: GenderType.FEMALE,
      },
    ];

    const errorDto = [
      {
        name: 'Raja',
        gender: 'Other',
      },
      {
        name: 'Mala',
        gender: GenderType.FEMALE,
      },
    ];

    expect(await target.transform(dto, {} as any)).toEqual(dto);

    expect(() => target.transform(errorDto, {} as any)).toThrowError(
      new BadRequestException(`${errorDto[0].gender} is not a valid gender`),
    );
  });
});
