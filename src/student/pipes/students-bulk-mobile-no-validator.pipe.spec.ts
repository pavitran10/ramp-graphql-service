import { BadRequestException } from '@nestjs/common';
import { StudentsBulkMobileNoValidatorPipe } from './students-bulk-mobile-no-validator.pipe';

describe('StudentsBulkMobileNoValidatorPipe', () => {
  let target: StudentsBulkMobileNoValidatorPipe;

  beforeEach(() => {
    target = new StudentsBulkMobileNoValidatorPipe();
  });

  it('should be defined', () => {
    expect(new StudentsBulkMobileNoValidatorPipe()).toBeDefined();
  });

  it('validate age', async () => {
    const dto = [
      {
        name: 'Raja',
        mobile_no: '0123456789',
      },
      {
        name: 'Mala',
        mobile_no: '0987654321',
      },
    ];

    const errorDto = [
      {
        name: 'Raja',
        mobile_no: '012345678999999',
      },
      {
        name: 'Mala',
        mobile_no: '0123456789',
      },
    ];

    expect(await target.transform(dto, {} as any)).toEqual(dto);

    expect(() => target.transform(errorDto, {} as any)).toThrowError(
      new BadRequestException(
        `${errorDto[0].mobile_no} is not a correct mobile number type`,
      ),
    );
  });
});
