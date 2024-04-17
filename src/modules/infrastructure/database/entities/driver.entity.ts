import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity({ name: 'drivers' })
export class DriverEntity {
    @Column({
        nullable: false,
        primary: true,
        type: 'varchar',
        length: 255,
    })
    id: string;

    @Column({
        nullable: false,
        name: 'full_name',
        type: 'varchar',
        length: 255,
    })
    fullName: string;

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
        length: 255,
    })
    email: string;

    @Column({
        nullable: false,
        name: 'phone_number',
        type: 'varchar',
        length: 50,
    })
    phoneNumber: string;

    @Column({
        nullable: false,
        name: 'licence_plate',
        type: 'varchar',
        length: 50,
    })
    licensePlate: string;

    @Column({
        nullable: false,
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    latitude: number;

    @Column({
        nullable: false,
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    longitude: number;

    @Column({
        nullable: false,
        default: true,
        type: 'boolean',
    })
    available: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;

    @OneToMany(() => TripEntity, (trip) => trip.driver)
    trips: TripEntity[];
}
