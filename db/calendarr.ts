import knex from "./knex"

function getAllEmployees() {
    return knex("employee").select("*")
}

export default getAllEmployees
