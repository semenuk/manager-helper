import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ThemeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  answer: string;

  @Column()
  questions: string;

}
