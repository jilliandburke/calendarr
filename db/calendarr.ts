import knex from "./knex"
import type { ConfigObject } from '../src/types'

const readConfig = () => {
  // There will only ever be one config, therefore we will always pull the first record
  return knex('configs').select('*').where('configId', 1)
}

const updateConfig = (body: ConfigObject) => {
  // Set the id since we know there will only ever be one config
  body.configId = 1

  // If the config doens't exist insert it, otherwise update it
  return knex('configs').insert(body)
  .onConflict('configId')
  .merge()
}

export { readConfig, updateConfig }
