import { PaymentMethod } from '../../../shared/enums/payment-method.enum';
import { Invoice } from '../../domain/models/invoice.model';

export abstract class InvoiceUseCase {
    public abstract findAll(): Promise<Invoice[]>;
    public abstract findById(id: string): Promise<Invoice>;
    public abstract findByTrip(tripId: string): Promise<Invoice>;
    public abstract create(
        tripId: string,
        totalAmount: number,
        paymentMethod: PaymentMethod,
    ): Promise<Invoice>;
}
