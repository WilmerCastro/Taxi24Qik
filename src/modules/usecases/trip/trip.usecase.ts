import { TripStatus } from '../../../shared/enums/trip-status.enum';
import { Trip } from '../../domain/models/trip.model';

export abstract class TripUseCase {
    public abstract create(
        driverId: string,
        passengerId: string,
        originLatitude: number,
        originLongitude: number,
        destinationLatitude: number,
        destinationLongitude: number,
        status: TripStatus,
    ): Promise<Trip>;
    public abstract complete(id: string): Promise<Trip>;
    public abstract findAllActive(): Promise<Trip[]>;
}
