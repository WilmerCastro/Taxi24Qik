import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceRepository } from '../../../domain/repositories/invoice.repository';
import { Invoice } from '../../../domain/models/invoice.model';

export class InvoiceDBRepository implements InvoiceRepository {
    constructor(
        @InjectRepository(InvoiceEntity)
        private readonly invoiceRepository: Repository<InvoiceEntity>,
    ) {}

    public findAll(): Promise<Invoice[]> {
        return this.invoiceRepository.find({
            relations: ['trip', 'trip.driver', 'trip.passenger'],
        });
    }

    public findById(id: string): Promise<Invoice> {
        return this.invoiceRepository.findOne({
            relations: ['trip', 'trip.driver', 'trip.passenger'],
            where: { id },
        });
    }

    public findByTrip(tripId: string): Promise<Invoice> {
        return this.invoiceRepository.findOne({
            relations: ['trip', 'trip.driver', 'trip.passenger'],
            where: {
                trip: { id: tripId },
            },
        });
    }

    public save(invoice: Invoice): Promise<Invoice> {
        return this.invoiceRepository.save(
            plainToClass(InvoiceEntity, {
                id: uuid(),
                ...invoice,
            }),
        );
    }
}
