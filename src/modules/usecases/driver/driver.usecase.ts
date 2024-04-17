import { Driver } from '../../domain/models/driver.model';
import { Location } from '../../domain/models/location.model';

export abstract class DriverUseCase {
    public abstract findAll(): Promise<Driver[]>;
    public abstract findById(id: string): Promise<Driver>;
    public abstract findAllAvailable(): Promise<Driver[]>;
    public abstract findNearby(location: Location): Promise<Driver[]>;
    public abstract findNearest(location: Location): Promise<Driver[]>;
    public abstract create(payload: Partial<Driver>): Promise<Driver>;
}
