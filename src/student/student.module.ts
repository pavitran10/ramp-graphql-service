import { Student } from './entities/student.entity';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
