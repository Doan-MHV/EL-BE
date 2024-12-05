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
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';
import { AssignmentMaterialsEntity } from 'src/assignment-materials/infrastructure/persistence/relational/entities/assignment-materials.entity';
import { AssignmentSubmissionEntity } from '../../../../../assignment-submissions/infrastructure/persistence/relational/entities/assignment-submission.entity';
import { GradeEntity } from '../../../../../grades/infrastructure/persistence/relational/entities/grade.entity';

@Entity({
  name: 'assignment',
})
export class AssignmentsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  description: string;

  @Column({ type: Number, nullable: false })
  maxGrade: number;

  @Column({ type: String })
  status?: string;

  @Column({ type: Date })
  deadline: Date;

  @ManyToOne(() => CourseEntity, (course) => course.courseLectures, {
    nullable: false,
    eager: true,
  })
  course?: CourseEntity;

  @OneToMany(
    () => AssignmentMaterialsEntity,
    (assignmentMaterialsEntity) => assignmentMaterialsEntity?.assignment,
  )
  assignmentMaterials?: AssignmentMaterialsEntity[];

  @OneToMany(
    () => AssignmentSubmissionEntity,
    (assignmentSubmissionEntity) => assignmentSubmissionEntity?.assignment,
  )
  assignmentSubmissions?: AssignmentSubmissionEntity[];

  @OneToMany(() => GradeEntity, (grade) => grade?.assignment)
  grades?: GradeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
