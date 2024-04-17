import { Invoice } from '../models/invoice.model';

export abstract class InvoiceRepository {
    public abstract findAll(): Promise<Invoice[]>;
    public abstract findById(id: string): Promise<Invoice>;
    public abstract findByTrip(tripId: string): Promise<Invoice>;
    public abstract save(invoice: Invoice): Promise<Invoice>;
}
