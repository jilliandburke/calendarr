import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('configs', function (table) {
    table.increments('configId');
    table.string('sonarrUrl');
    table.string('sonarrApiKey');
    table.string('radarrUrl');
    table.string('radarrApiKey');
    table.string('hostingUrl');
    table.timestamps();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('configs')
}

