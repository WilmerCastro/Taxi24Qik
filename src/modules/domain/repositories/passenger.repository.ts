import { Passenger } from '../models/passenger.model';

export abstract class PassengerRepository {
    public abstract findAll(): Promise<Passenger[]>;
    public abstract findById(id: string): Promise<Passenger>;
    public abstract findByEmail(email: string): Promise<Passenger>;
    public abstract save(passenger: Passenger): Promise<Passenger>;
}
