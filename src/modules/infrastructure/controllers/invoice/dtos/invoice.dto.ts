import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsUUID,
} from 'class-validator';
import { PaymentMethod } from '../../../../../shared/enums/payment-method.enum';

export class InvoiceDto {
    @IsUUID()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    tripId: string;

    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    totalAmount: number;

    @IsEnum(PaymentMethod)
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    paymentMethod: PaymentMethod;
}
