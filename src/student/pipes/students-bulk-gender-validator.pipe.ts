import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { GenderType } from '../entities/student.entity';

@Injectable()
export class StudentsBulkGenderValidatorPipe implements PipeTransform {
  private logger: Logger = new Logger(StudentsBulkGenderValidatorPipe.name);
  transform(value: any[], metadata: ArgumentMetadata) {
    value.forEach((element) => {
      if (!Object.values(GenderType).includes(element.gender)) {
        this.logger.error(`${element.gender} is not a valid gender`);
        throw new BadRequestException(
          `${element.gender} is not a valid gender`,
        );
      }
    });
    return value;
  }
}
