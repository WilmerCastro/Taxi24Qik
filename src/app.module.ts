import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/infrastructure/database/database.module';
import { DriverController } from './modules/infrastructure/controllers/driver/driver.controller';
import { PassengerController } from './modules/infrastructure/controllers/passenger/passenger.controller';
import { TripController } from './modules/infrastructure/controllers/trip/trip.controller';
import { InvoiceController } from './modules/infrastructure/controllers/invoice/invoice.controller';
import { DriverService } from './modules/usecases/driver/driver.service';
import { PassengerService } from './modules/usecases/passenger/passenger.service';
import { TripService } from './modules/usecases/trip/trip.service';
import { DriverUseCase } from './modules/usecases/driver/driver.usecase';
import { PassengerUseCase } from './modules/usecases/passenger/passenger.usecase';
import { TripUseCase } from './modules/usecases/trip/trip.usecase';
import { InvoiceUseCase } from './modules/usecases/invoice/invoice.usecase';
import { InvoiceService } from './modules/usecases/invoice/invoice.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseModule,
    ],
    controllers: [
        DriverController,
        PassengerController,
        TripController,
        InvoiceController,
    ],
    providers: [
        {
            provide: DriverUseCase,
            useClass: DriverService,
        },
        {
            provide: PassengerUseCase,
            useClass: PassengerService,
        },
        {
            provide: TripUseCase,
            useClass: TripService,
        },
        {
            provide: InvoiceUseCase,
            useClass: InvoiceService,
        },
    ],
})
export class AppModule {}
