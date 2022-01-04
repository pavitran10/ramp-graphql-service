import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { GenderType } from '../entities/student.entity';

@Injectable()
export class StudentGenderValidatorPipe implements PipeTransform {
  private logger: Logger = new Logger(StudentGenderValidatorPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Object.values(GenderType).includes(value.gender)) {
      this.logger.error(`${value.gender} is not a valid gender`);
      throw new BadRequestException(`${value.gender} is not a valid gender`);
    }
    return value;
  }
}
