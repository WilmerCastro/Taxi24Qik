import { ApiProperty } from '@nestjs/swagger';
import { Trip } from './trip.model';

export abstract class Driver {
    @ApiProperty() id?: string;
    @ApiProperty() fullName: string;
    @ApiProperty() email: string;
    @ApiProperty() phoneNumber: string;
    @ApiProperty() licensePlate: string;
    @ApiProperty() latitude: number;
    @ApiProperty() longitude: number;
    @ApiProperty() available: boolean;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
    trips?: Trip[];
}
