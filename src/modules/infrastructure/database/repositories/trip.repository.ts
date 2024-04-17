import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { TripEntity } from '../entities/trip.entity';
import { TripRepository } from '../../../domain/repositories/trip.repository';
import { Trip } from '../../../domain/models/trip.model';
import { TripStatus } from '../../../../shared/enums/trip-status.enum';

export class TripDBRepository implements TripRepository {
    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>,
    ) {}

    public save(trip: Trip): Promise<Trip> {
        return this.tripRepository.save(
            plainToClass(Trip, {
                id: uuid(),
                ...trip,
            }),
        );
    }

    public findById(id: string): Promise<Trip> {
        return this.tripRepository.findOne({
            relations: ['driver', 'passenger', 'invoice'],
            where: { id },
        });
    }

    public findAllActive(): Promise<Trip[]> {
        return this.tripRepository.find({
            relations: ['driver', 'passenger', 'invoice'],
            where: {
                status: TripStatus.INPROGRESS,
            },
        });
    }
}
