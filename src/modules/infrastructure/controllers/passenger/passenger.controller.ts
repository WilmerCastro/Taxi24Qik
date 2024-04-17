import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerUseCase } from '../../../usecases/passenger/passenger.usecase';
import { Passenger } from '../../../domain/models/passenger.model';
import { PassengerDto } from './dtos/passenger.dto';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
    constructor(
        @Inject(PassengerUseCase)
        private readonly passengerCaseUse: PassengerUseCase,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all passengers',
        description: 'Returns a list of all passengers.',
    })
    @ApiOkResponse({
        description: 'List of passengers retrieved successfully.',
        type: Passenger,
        isArray: true,
    })
    public findAll(): Promise<Passenger[]> {
        return this.passengerCaseUse.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a passenger by ID',
        description: 'Returns a passenger based on the provided ID.',
    })
    @ApiOkResponse({
        description: 'Passenger retrieved successfully.',
        type: Passenger,
    })
    public findById(@Param('id') id: string): Promise<Passenger> {
        return this.passengerCaseUse.findById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new passenger',
        description: 'Creates a new passenger with the provided data.',
    })
    @ApiOkResponse({
        description: 'Passenger created successfully.',
        type: Passenger,
    })
    @ApiBody({
        type: PassengerDto,
        description: 'Data required to create a new passenger.',
    })
    public create(@Body() passenger: PassengerDto): Promise<Passenger> {
        return this.passengerCaseUse.create(passenger);
    }
}
