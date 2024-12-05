import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { GradeEntity } from '../../../../../grades/infrastructure/persistence/relational/entities/grade.entity';

@Entity({
  name: 'quiz',
})
export class QuizzesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => CourseEntity, (course) => course.courseQuizzes, {
    eager: true,
  })
  @JoinColumn({ name: 'courseId' })
  course?: CourseEntity;

  @OneToMany(() => GradeEntity, (grade) => grade?.quiz)
  grades?: GradeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
