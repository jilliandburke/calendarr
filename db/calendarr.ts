import knex from "./knex"
import type { ConfigObject } from '../src/types'

const readConfig = () => {
  // There will only ever be one config, therefore we will always pull the first record
  return knex('configs').select('*').where('configId', 1)
}

const updateConfig = (body: ConfigObject) => {
  // There will only ever be one config, therefore we will always update the first record
  return knex('configs').where('configId', 1).update({
    sonarrUrl: body.sonarrUrl,
    sonarrApiKey: body.sonarrApiKey,
    radarrUrl: body.radarrUrl,
    radarrApiKey: body.radarrApiKey,
  })
}

export { readConfig, updateConfig }
