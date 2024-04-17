import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TripEntity } from './trip.entity';
import { PaymentStatus } from '../../../../shared/enums/payment-status.enum';
import { PaymentMethod } from '../../../../shared/enums/payment-method.enum';

@Entity({ name: 'invoices' })
export class InvoiceEntity {
    @Column({
        nullable: false,
        primary: true,
        type: 'varchar',
        length: 255,
    })
    id: string;

    @OneToOne(() => TripEntity, (trip) => trip.invoice)
    @JoinColumn({
        name: 'trip_id',
    })
    trip: TripEntity;

    @Column({
        nullable: false,
        name: 'total_amount',
    })
    totalAmount: number;

    @Column({
        nullable: false,
        name: 'payment_method',
        type: 'enum',
        enum: PaymentMethod,
    })
    paymentMethod: PaymentMethod;

    @Column({
        nullable: false,
        name: 'payment_status',
        type: 'enum',
        enum: PaymentStatus,
    })
    paymentStatus: PaymentStatus;

    @Column({
        nullable: false,
        name: 'issued_at',
        type: 'date',
    })
    issuedAt: Date;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;
}
