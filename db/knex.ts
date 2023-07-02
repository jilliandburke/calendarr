import knex from "knex"
const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "calendarr.db"
    }
})

export default connectKnex
