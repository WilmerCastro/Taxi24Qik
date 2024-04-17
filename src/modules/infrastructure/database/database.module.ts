import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../../config/db.config';
import { DriverEntity } from './entities/driver.entity';
import { PassengerEntity } from './entities/passenger.entity';
import { TripEntity } from './entities/trip.entity';
import { InvoiceEntity } from './entities/invoice.entity';
import { DriverDBRepository } from './repositories/driver.repository';
import { PassengerDBRepository } from './repositories/passenger.repository';
import { TripDBRepository } from './repositories/trip.repository';
import { DriverRepository } from '../../domain/repositories/driver.repository';
import { PassengerRepository } from '../../domain/repositories/passenger.repository';
import { TripRepository } from '../../domain/repositories/trip.repository';
import { InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { InvoiceDBRepository } from './repositories/invoice.repository';

const repositories = [
    {
        provide: DriverRepository,
        useClass: DriverDBRepository,
    },
    {
        provide: PassengerRepository,
        useClass: PassengerDBRepository,
    },
    {
        provide: TripRepository,
        useClass: TripDBRepository,
    },
    {
        provide: InvoiceRepository,
        useClass: InvoiceDBRepository,
    },
];

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([
            DriverEntity,
            PassengerEntity,
            TripEntity,
            InvoiceEntity,
        ]),
    ],
    providers: [...repositories],
    exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
