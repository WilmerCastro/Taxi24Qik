import {
    Body,
    Controller,
    Get,
    Inject,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { InvoiceUseCase } from '../../../usecases/invoice/invoice.usecase';
import { Invoice } from '../../../domain/models/invoice.model';
import { InvoiceDto } from './dtos/invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
    constructor(
        @Inject(InvoiceUseCase)
        private readonly invoiceCaseUse: InvoiceUseCase,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all invoices',
        description: 'Returns a list of all invoices.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of invoices retrieved successfully.',
        type: Invoice,
        isArray: true,
    })
    public findAll(): Promise<Invoice[]> {
        return this.invoiceCaseUse.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve an invoice by ID',
        description: 'Returns an invoice based on the provided ID.',
    })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({
        description: 'Invoice retrieved successfully.',
        type: Invoice,
    })
    public findById(@Param('id') id: string): Promise<Invoice> {
        return this.invoiceCaseUse.findById(id);
    }

    @Get('/trip/:tripId')
    @ApiOperation({
        summary: 'Retrieve an invoice by trip ID',
        description: 'Returns an invoice related to the specified trip.',
    })
    @ApiParam({ name: 'tripId', type: String })
    @ApiOkResponse({
        description: 'Invoice related to the trip retrieved successfully.',
        type: Invoice,
    })
    public findByTrip(@Param('tripId') tripId: string): Promise<Invoice> {
        return this.invoiceCaseUse.findByTrip(tripId);
    }

    @Post()
    @ApiOperation({
        summary: 'Create an invoice',
        description: 'Creates a new invoice with the provided data.',
    })
    @ApiBody({ type: InvoiceDto })
    @ApiCreatedResponse({
        description: 'Invoice created successfully.',
        type: Invoice,
    })
    public create(@Body() invoice: InvoiceDto): Promise<Invoice> {
        return this.invoiceCaseUse.create(
            invoice.tripId,
            invoice.totalAmount,
            invoice.paymentMethod,
        );
    }
}
