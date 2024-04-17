import { Trip } from '../models/trip.model';

export abstract class TripRepository {
    public abstract save(trip: Trip): Promise<Trip>;
    public abstract findById(id: string): Promise<Trip>;
    public abstract findAllActive(): Promise<Trip[]>;
}
