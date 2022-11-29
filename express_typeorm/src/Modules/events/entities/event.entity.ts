import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workshop } from './workshop.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'datetime' })
    createdAt: string;

    @OneToMany(() => Workshop, workshop => workshop.event)
    //@JoinColumn({ name: 'id', referencedColumnName: 'eventId' })
    workshops?: Workshop[];
}
