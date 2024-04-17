import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDefined,
    IsEmail,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class DriverDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    fullName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    licensePlate: string;

    @IsNotEmpty()
    @IsDefined()
    @IsLatitude()
    @ApiProperty()
    latitude: number;

    @IsNotEmpty()
    @IsDefined()
    @IsLongitude()
    @ApiProperty()
    longitude: number;

    @IsBoolean()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    available: boolean;
}
