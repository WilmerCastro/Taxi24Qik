import {BadRequestException, Inject, Injectable, NotFoundException,} from '@nestjs/common';
import {TripUseCase} from './trip.usecase';
import {Trip} from '../../domain/models/trip.model';
import {TripStatus} from '../../../shared/enums/trip-status.enum';
import {DriverRepository} from '../../domain/repositories/driver.repository';
import {PassengerRepository} from '../../domain/repositories/passenger.repository';
import {TripRepository} from '../../domain/repositories/trip.repository';
import {InvoiceRepository} from '../../domain/repositories/invoice.repository';
import {PaymentMethod} from '../../../shared/enums/payment-method.enum';
import {PaymentStatus} from '../../../shared/enums/payment-status.enum';

@Injectable()
export class TripService implements TripUseCase {
    constructor(
        @Inject(DriverRepository)
        private readonly driverRepository: DriverRepository,
        @Inject(PassengerRepository)
        private readonly passengerRepository: PassengerRepository,
        @Inject(TripRepository)
        private readonly tripRepository: TripRepository,
        @Inject(InvoiceRepository)
        private readonly invoiceRepository: InvoiceRepository,
    ) {}

    public async create(
        driverId: string,
        passengerId: string,
        originLatitude: number,
        originLongitude: number,
        destinationLatitude: number,
        destinationLongitude: number,
        status: TripStatus,
    ): Promise<Trip> {
        const driver = await this.driverRepository.findById(driverId);
        const passenger = await this.passengerRepository.findById(passengerId);

        if (!driver) {
            throw new NotFoundException('Driver not found.');
        }

        if (!driver.available) {
            throw new BadRequestException(
                'The driver is not available to make the trip.',
            );
        }

        if (!passenger) {
            throw new NotFoundException('Passenger not found.');
        }

        try {
            return await this.tripRepository.save({
                driver,
                passenger,
                originLatitude,
                originLongitude,
                destinationLatitude,
                destinationLongitude,
                status,
            });
        } catch (error) {
            throw error;
        }
    }

    public async complete(id: string): Promise<Trip> {
        if (!id) {
            throw new NotFoundException(
                'You must provide ID to complete the trip.',
            );
        }

        const trip = await this.tripRepository.findById(id);

        if (!trip) {
            throw new NotFoundException('Trip not found.');
        }

        if (trip.status && trip.status === TripStatus.COMPLETED) {
            return trip;
        }

        trip.status = TripStatus.COMPLETED;

        try {
            const tripCompleted = await this.tripRepository.save(trip);
            const invoice = await this.invoiceRepository.save({
                trip: tripCompleted,
                totalAmount: 120,
                paymentMethod: PaymentMethod.CASH,
                paymentStatus: PaymentStatus.PAID,
                issuedAt: new Date(),
            });

            return Object.assign(tripCompleted, {
                invoice: {
                    id: invoice.id,
                    totalAmount: invoice.totalAmount,
                    paymentMethod: invoice.paymentMethod,
                    paymentStatus: invoice.paymentStatus,
                    issuedAt: invoice.issuedAt,
                    createdAt: invoice.createdAt,
                    updatedAt: invoice.updatedAt,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    public async findAllActive(): Promise<Trip[]> {
        try {
            return await this.tripRepository.findAllActive();
        } catch (error) {
            throw error;
        }
    }
}
