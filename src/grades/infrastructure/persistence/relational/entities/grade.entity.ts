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
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { QuizzesEntity } from '../../../../../quizzes/infrastructure/persistence/relational/entities/quizzes.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'grade',
})
export class GradeEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String })
  feedback?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  grade?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  maxGrade?: number;

  @ManyToOne(() => UserEntity, (user) => user.grades, {
    nullable: false,
    eager: true,
  })
  student?: UserEntity;

  @ManyToOne(() => AssignmentsEntity, (assignment) => assignment.grades, {
    nullable: false,
    eager: true,
  })
  assignment?: AssignmentsEntity;

  @ManyToOne(() => QuizzesEntity, (quizz) => quizz.grades, {
    nullable: false,
    eager: true,
  })
  quiz?: QuizzesEntity;

  @ManyToOne(() => CourseEntity, (course) => course.grades, {
    nullable: false,
    eager: true,
  })
  course?: CourseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
