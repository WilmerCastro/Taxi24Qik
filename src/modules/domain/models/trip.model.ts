import { ApiProperty } from '@nestjs/swagger';
import { Driver } from './driver.model';
import { Passenger } from './passenger.model';
import { Invoice } from './invoice.model';

enum TripStatus {
    INPROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export class Trip {
    @ApiProperty() id?: string;
    @ApiProperty({ type: () => Driver }) driver: Driver;
    @ApiProperty({ type: () => Passenger }) passenger: Passenger;
    @ApiProperty() originLatitude: number;
    @ApiProperty() originLongitude: number;
    @ApiProperty() destinationLatitude: number;
    @ApiProperty() destinationLongitude: number;
    @ApiProperty() status: TripStatus;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
    @ApiProperty() invoice?: Invoice;
}
