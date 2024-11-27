import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LectureEntity } from 'src/lectures/infrastructure/persistence/relational/entities/lecture.entity';
import { QuizzesEntity } from 'src/quizzes/infrastructure/persistence/relational/entities/quizzes.entity';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { EnrollmentEntity } from '../../../../../enrollments/infrastructure/persistence/relational/entities/enrollment.entity';

@Entity({
  name: 'course',
})
export class CourseEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true, nullable: false })
  courseName: string;

  @Column({ type: String })
  categoryType?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  coursePrice?: number;

  @ManyToOne(() => UserEntity, (user) => user.courses, {
    nullable: false,
    eager: true,
  })
  courseCreator?: UserEntity;

  @OneToMany(() => LectureEntity, (lecture) => lecture?.course)
  courseLectures?: LectureEntity[];

  @OneToMany(() => AssignmentsEntity, (assignment) => assignment?.course)
  courseAssignments?: AssignmentsEntity[];

  @OneToMany(() => QuizzesEntity, (quiz) => quiz?.course)
  courseQuizzes?: QuizzesEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment?.course)
  enrollments?: EnrollmentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
