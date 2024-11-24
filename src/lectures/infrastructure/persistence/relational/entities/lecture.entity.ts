import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'lecture',
})
export class LectureEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  lectureName: string;

  @Column({ type: String })
  lectureTime: string;

  @Column({ type: Date })
  lectureDate?: Date;

  @Column({ type: String })
  markdownContent?: string;

  @ManyToOne(() => CourseEntity, (course) => course.courseLectures, {
    nullable: false,
    eager: true,
  })
  course?: CourseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
