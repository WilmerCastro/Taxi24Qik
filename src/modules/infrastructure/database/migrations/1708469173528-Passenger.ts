import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as passengersData from '../data/passengers.json';

export class Passenger1708469173528 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'passengers',
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

        for (const passenger of passengersData) {
            if (!passenger) {
                continue;
            }

            await queryRunner.query(
                'INSERT INTO "passengers"("id", "full_name", "email", "phone_number", "created_at", "updated_at") VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT);',
                [
                    passenger.id,
                    passenger.fullName,
                    passenger.email,
                    passenger.phoneNumber,
                ],
            );

            console.log('Passenger registered successfully:', passenger.id);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('passengers');
        await queryRunner.dropTable('passengers');
    }
}
