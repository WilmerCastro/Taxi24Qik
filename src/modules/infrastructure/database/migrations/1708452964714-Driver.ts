import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as driversData from '../data/drivers.json';

export class Driver1708452964714 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'drivers',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: true,
                    },
                    {
                        name: 'full_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'licence_plate',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'latitude',
                        type: 'numeric',
                        precision: 19,
                        scale: 15,
                        isNullable: false,
                    },
                    {
                        name: 'longitude',
                        type: 'numeric',
                        precision: 19,
                        scale: 15,
                        isNullable: false,
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true,
        );

        for (const driver of driversData) {
            if (!driver) {
                continue;
            }

            await queryRunner.query(
                'INSERT INTO "drivers"("id", "full_name", "email", "phone_number", "licence_plate", "latitude", "longitude", "available", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, DEFAULT, DEFAULT);',
                [
                    driver.id,
                    driver.fullName,
                    driver.email,
                    driver.phoneNumber,
                    driver.licencePlate,
                    driver.latitude,
                    driver.longitude,
                    driver.available,
                ],
            );

            console.log('Driver registered successfully:', driver.id);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('drivers');
        await queryRunner.dropTable('drivers');
    }
}
