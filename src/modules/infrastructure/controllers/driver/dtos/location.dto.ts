import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
} from 'class-validator';

export class LocationDto {
    @IsLatitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    latitude: number;

    @IsLongitude()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    longitude: number;
}
