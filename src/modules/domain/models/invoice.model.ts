import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../../../shared/enums/payment-method.enum';
import { PaymentStatus } from '../../../shared/enums/payment-status.enum';
import { Trip } from './trip.model';

export class Invoice {
    @ApiProperty() id?: string;
    @ApiProperty({ type: () => Trip }) trip: Trip;
    @ApiProperty() totalAmount: number;
    @ApiProperty() paymentMethod: PaymentMethod;
    @ApiProperty() paymentStatus: PaymentStatus;
    @ApiProperty() issuedAt: Date;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
}
