import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsEnum,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';
import { TripStatus } from '../../../../../shared/enums/trip-status.enum';


export class TripDto {
    @IsUUID()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    driverId: string;

    @IsUUID()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    passengerId: string;

    @IsLatitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    originLatitude: number;

    @IsLongitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    originLongitude: number;

    @IsLatitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    destinationLatitude: number;

    @IsLongitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    destinationLongitude: number;

    @IsEnum(TripStatus)
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    status: TripStatus;
}
