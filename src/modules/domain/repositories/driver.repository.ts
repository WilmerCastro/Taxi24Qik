import { Driver } from '../models/driver.model';
import { Location } from '../models/location.model';

export abstract class DriverRepository {
    public abstract findAll(): Promise<Driver[]>;
    public abstract findById(id: string): Promise<Driver>;
    public abstract findByEmail(email: string): Promise<Driver>;
    public abstract findAvailables(): Promise<Driver[]>;
    public abstract findNearest(location: Location): Promise<Driver[]>;
    public abstract save(driver: Driver): Promise<Driver>;
}
