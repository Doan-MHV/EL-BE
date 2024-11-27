import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'enrollment',
})
export class EnrollmentEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.courses, {
    nullable: false,
    eager: true,
  })
  student?: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
    nullable: false,
    eager: true,
  })
  course?: CourseEntity;

  @Column({})
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
