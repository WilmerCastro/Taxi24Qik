import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { Trip } from '../../../domain/models/trip.model';
import { TripUseCase } from '../../../usecases/trip/trip.usecase';
import { TripDto } from './dtos/trip.dto';

@ApiTags('Trips')
@Controller('trips')
export class TripController {
    constructor(
        @Inject(TripUseCase)
        private readonly tripCaseUse: TripUseCase,
    ) {}

    @Get('/actives')
    @ApiOperation({
        summary: 'Find all active trips',
        description: 'Returns a list of all active trips.',
    })
    @ApiResponse({
        status: 200,
        description: 'List of active trips retrieved successfully.',
        type: Trip,
        isArray: true,
    })
    public findAllActive(): Promise<Trip[]> {
        return this.tripCaseUse.findAllActive();
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Complete a trip',
        description: 'Marks a trip as completed based on the provided ID.',
    })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({
        status: 200,
        description: 'Trip completed successfully.',
        type: Trip,
    })
    public complete(@Param('id') id: string): Promise<Trip> {
        return this.tripCaseUse.complete(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a trip',
        description: 'Creates a new trip with the provided data.',
    })
    @ApiBody({ type: TripDto })
    @ApiResponse({
        status: 201,
        description: 'Trip created successfully.',
        type: Trip,
    })
    public create(@Body() trip: TripDto): Promise<Trip> {
        return this.tripCaseUse.create(
            trip.driverId,
            trip.passengerId,
            trip.originLatitude,
            trip.originLongitude,
            trip.destinationLatitude,
            trip.destinationLongitude,
            trip.status,
        );
    }
}
