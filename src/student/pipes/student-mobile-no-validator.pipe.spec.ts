import { BadRequestException } from '@nestjs/common';
import { StudentMobileNoValidatorPipe } from './student-mobile-no-validator.pipe';

describe('StudentMobileNoValidatorPipe', () => {
  let target: StudentMobileNoValidatorPipe;

  beforeEach(() => {
    target = new StudentMobileNoValidatorPipe();
  });

  it('should be defined', () => {
    expect(new StudentMobileNoValidatorPipe()).toBeDefined();
  });

  it('validate age', async () => {
    const dto = {
      name: 'Raja',
      mobile_no: '0123456789',
    };

    const errorDto = {
      name: 'Raja',
      mobile_no: '012345678999999',
    };

    expect(await target.transform(dto, {} as any)).toEqual(dto);

    expect(() => target.transform(errorDto, {} as any)).toThrowError(
      new BadRequestException(
        `${errorDto.mobile_no} is not a correct mobile number type`,
      ),
    );
  });
});
