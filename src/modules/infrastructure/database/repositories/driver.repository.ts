import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { DriverEntity } from '../entities/driver.entity';
import { Driver } from '../../../domain/models/driver.model';
import { DriverRepository } from '../../../domain/repositories/driver.repository';
import { Location } from '../../../domain/models/location.model';

@Injectable()
export class DriverDBRepository implements DriverRepository {
    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>,
    ) {}

    public findAll(): Promise<Driver[]> {
        return this.driverRepository.find();
    }

    public findById(id: string): Promise<Driver> {
        return this.driverRepository.findOneBy({ id });
    }

    public findByEmail(email: string): Promise<Driver> {
        return this.driverRepository.findOneBy({ email });
    }

    public findAvailables(): Promise<Driver[]> {
        return this.driverRepository.findBy({ available: true });
    }

    public findNearest(location: Location): Promise<Driver[]> {
        return this.driverRepository
            .createQueryBuilder()
            .addSelect(
                `SQRT(POWER(latitude - :latitude, 2) + POWER(longitude - :longitude, 2))`,
                'distance',
            )
            .setParameters({
                latitude: location.latitude,
                longitude: location.longitude,
            })
            .orderBy('distance', 'ASC')
            .limit(3)
            .getMany();
    }

    public save(driver: Driver): Promise<Driver> {
        return this.driverRepository.save(
            plainToClass(DriverEntity, {
                id: uuid(),
                ...driver,
            }),
        );
    }
}
