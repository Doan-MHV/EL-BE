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
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { AssignmentsEntity } from 'src/assignments/infrastructure/persistence/relational/entities/assignments.entity';

@Entity({
  name: 'assignmentMaterial',
})
export class AssignmentMaterialsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String })
  description?: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  file?: FileEntity | null;

  @ManyToOne(
    () => AssignmentsEntity,
    (assignment) => assignment?.assignmentMaterials,
    {
      nullable: false,
      eager: true,
    },
  )
  assignment?: AssignmentsEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
