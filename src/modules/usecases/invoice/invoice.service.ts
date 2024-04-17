import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InvoiceUseCase} from './invoice.usecase';
import {Invoice} from '../../domain/models/invoice.model';
import {InvoiceRepository} from '../../domain/repositories/invoice.repository';
import {TripRepository} from '../../domain/repositories/trip.repository';
import {PaymentMethod} from '../../../shared/enums/payment-method.enum';
import {PaymentStatus} from '../../../shared/enums/payment-status.enum';

@Injectable()
export class InvoiceService implements InvoiceUseCase {
    constructor(
        @Inject(TripRepository)
        private readonly tripRepository: TripRepository,
        @Inject(InvoiceRepository)
        private readonly invoiceReposity: InvoiceRepository,
    ) {}

    public async findAll(): Promise<Invoice[]> {
        try {
            return await this.invoiceReposity.findAll();
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Invoice> {
        if (!id) {
            throw new NotFoundException(
                'You must provide an invoice ID to obtain the data.',
            );
        }

        try {
            const invoice = await this.invoiceReposity.findById(id);

            if (!invoice) {
                throw new NotFoundException('Invoice not found.');
            }

            return invoice;
        } catch (error) {
            throw error;
        }
    }

    public async findByTrip(tripId: string): Promise<Invoice> {
        if (!tripId) {
            throw new NotFoundException(
                'You must provide travel ID to obtain invoice details.',
            );
        }

        try {
            const invoice = await this.invoiceReposity.findByTrip(tripId);

            if (!invoice) {
                throw new NotFoundException('Invoice not found.');
            }

            return invoice;
        } catch (error) {
            throw error;
        }
    }

    public async create(
        tripId: string,
        totalAmount: number,
        paymentMethod: PaymentMethod,
    ): Promise<Invoice> {
        const trip = await this.tripRepository.findById(tripId);

        if (!trip) {
            throw new NotFoundException('Trip not found.');
        }

        try {
            return await this.invoiceReposity.save({
                trip,
                totalAmount,
                paymentMethod,
                paymentStatus: PaymentStatus.PAID,
                issuedAt: new Date(),
            });
        } catch (error) {
            throw error;
        }
    }
}
