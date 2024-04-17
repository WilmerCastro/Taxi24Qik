import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class PassengerDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    fullName: string;

    @IsEmail()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    updatedAt?: Date;
}
