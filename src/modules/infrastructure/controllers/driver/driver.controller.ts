import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { DriverDto } from './dtos/driver.dto';
import { LocationDto } from './dtos/location.dto';
import { DriverUseCase } from '../../../usecases/driver/driver.usecase';
import { Driver } from '../../../domain/models/driver.model';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
    constructor(
        @Inject(DriverUseCase)
        private readonly driverCaseUse: DriverUseCase,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all drivers',
        description: 'Returns a list of all drivers.',
    })
    @ApiOkResponse({
        description: 'List of drivers retrieved successfully.',
        type: Driver,
        isArray: true,
    })
    public findAll(): Promise<Driver[]> {
        return this.driverCaseUse.findAll();
    }

    @Get('/availables')
    @ApiOperation({
        summary: 'Retrieve all available drivers',
        description: 'Returns a list of all available drivers.',
    })
    @ApiOkResponse({
        description: 'List of available drivers retrieved successfully.',
        type: Driver,
        isArray: true,
    })
    public findAvailables(): Promise<Driver[]> {
        return this.driverCaseUse.findAllAvailable();
    }

    @Get('/nearby')
    @ApiOperation({
        summary: 'Retrieve drivers available within a 3 km radius',
        description: 'Returns a list of drivers near the specified location.',
    })
    @ApiOkResponse({
        description: 'List of nearby drivers retrieved successfully.',
        type: Driver,
        isArray: true,
    })
    public findNearby(@Query() location: LocationDto): Promise<Driver[]> {
        return this.driverCaseUse.findNearby(location);
    }

    @Get('/nearest')
    @ApiOperation({
        summary:
            'Retrieve the drivers closest to a passenger is departure point',
        description: 'Returns the nearest drivers to the specified location.',
    })
    @ApiOkResponse({
        description: 'List of nearest drivers retrieved successfully.',
        type: Driver,
        isArray: true,
    })
    public findNearest(@Query() location: LocationDto): Promise<Driver[]> {
        return this.driverCaseUse.findNearest(location);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a driver by ID',
        description: 'Returns a driver based on the provided ID.',
    })
    @ApiParam({ name: 'id', description: 'ID of the driver to retrieve.' })
    @ApiOkResponse({
        description: 'Driver retrieved successfully.',
        type: Driver,
    })
    public findById(@Param('id') id: string): Promise<Driver> {
        return this.driverCaseUse.findById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new driver',
        description: 'Creates a new driver with the provided data.',
    })
    @ApiBody({
        type: DriverDto,
        description: 'Data required to create a new driver.',
    })
    @ApiOkResponse({
        description: 'Driver created successfully.',
        type: Driver,
    })
    public save(@Body() driver: DriverDto): Promise<Driver> {
        return this.driverCaseUse.create(driver);
    }
}
