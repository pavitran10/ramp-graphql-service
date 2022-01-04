import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StudentsBulkMobileNoValidatorPipe implements PipeTransform {
  private logger: Logger = new Logger(StudentsBulkMobileNoValidatorPipe.name);
  transform(value: any[], metadata: ArgumentMetadata) {
    value.forEach((element) => {
      const regex = new RegExp(/^0\d{9}$/);
      if (!regex.test(element.mobile_no)) {
        this.logger.error(
          `${element.mobile_no} is not a correct mobile number type`,
        );
        throw new BadRequestException(
          `${element.mobile_no} is not a correct mobile number type`,
        );
      }
    });
    return value;
  }
}
