import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StudentMobileNoValidatorPipe implements PipeTransform {
  private logger: Logger = new Logger(StudentMobileNoValidatorPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    const regex = new RegExp(/^0\d{9}$/);
    if (!regex.test(value.mobile_no)) {
      this.logger.error(
        `${value.mobile_no} is not a correct mobile number type`,
      );
      throw new BadRequestException(
        `${value.mobile_no} is not a correct mobile number type`,
      );
    }
    return value;
  }
}
