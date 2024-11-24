import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'assignmentSubmission',
})
export class AssignmentSubmissionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  status?: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  file?: FileEntity | null;

  @ManyToOne(
    () => AssignmentsEntity,
    (assignment) => assignment?.assignmentSubmissions,
    {
      nullable: false,
      eager: true,
    },
  )
  assignment?: AssignmentsEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.assignmentSubmissions, {
    nullable: false,
    eager: true,
  })
  student?: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
