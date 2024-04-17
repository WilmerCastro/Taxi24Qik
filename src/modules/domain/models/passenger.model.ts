import { ApiProperty } from '@nestjs/swagger';
import { Trip } from './trip.model';

export abstract class Passenger {
    @ApiProperty() id?: string;
    @ApiProperty() fullName: string;
    @ApiProperty() email: string;
    @ApiProperty() phoneNumber: string;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
    trips?: Trip[];
}
