import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    //throw new Error('TODO: implement migration in task 4');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'email', type: 'varchar' },
          { name: 'name', type: 'varchar' },
          { name: 'role', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'duration', type: 'integer' },
          { name: 'releaseDate', type: 'timestamp' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'show',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'screenId', type: 'integer' },
          { name: 'movieId', type: 'varchar' },
          { name: 'start', type: 'timestamp' },
          { name: 'end', type: 'timestamp' },
          { name: 'price', type: 'integer', default: 250 },
          { name: 'availablePaymentType', type: 'varchar[]', enum: ['card', 'case'] },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'screen',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'vipSit', type: 'integer', default: 10 },
          { name: 'coupleSit', type: 'integer', default: 10 },
          { name: 'premiumSit', type: 'integer', default: 10 },
          { name: 'seats', type: 'integer', default:60 },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'booking',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'integer' },
          { name: 'showId', type: 'integer' },
          { name: 'seatNo', type: 'integer' },
          { name: 'seatType', type: 'varchar', enum: ['vip', 'premium', 'couple','deafult'] },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['showId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'show',
      new TableForeignKey({
        columnNames: ['screenId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screen',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'show',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
