import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import { DriverEntity } from './driver.entity';
import { PassengerEntity } from './passenger.entity';
import { InvoiceEntity } from './invoice.entity';
import { TripStatus } from '../../../../shared/enums/trip-status.enum';

@Entity({ name: 'trips' })
export class TripEntity {
    @Column({
        nullable: false,
        primary: true,
        type: 'varchar',
        length: 255,
    })
    id: string;

    @ManyToOne(() => DriverEntity, (driver) => driver.trips)
    @JoinColumn({
        name: 'driver_id',
    })
    driver: DriverEntity;

    @ManyToOne(() => PassengerEntity, (passenger) => passenger.trips)
    @JoinColumn({
        name: 'passenger_id',
    })
    passenger: PassengerEntity;

    @Column({
        nullable: false,
        name: 'origin_latitude',
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    originLatitude: number;

    @Column({
        nullable: false,
        name: 'origin_longitude',
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    originLongitude: number;

    @Column({
        nullable: false,
        name: 'destination_latitude',
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    destinationLatitude: number;

    @Column({
        nullable: false,
        name: 'destination_longitude',
        type: 'numeric',
        precision: 19,
        scale: 15,
    })
    destinationLongitude: number;

    @Column({
        nullable: false,
        type: 'enum',
        enum: TripStatus,
        default: TripStatus.INPROGRESS,
    })
    status: TripStatus;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;

    @OneToOne(() => InvoiceEntity, (invoice) => invoice.trip, {
        cascade: true,
    })
    invoice?: InvoiceEntity;
}
