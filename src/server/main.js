import config from './config'
import express from './express'

if (config.isProduction || require('piping')(config.piping)) {
  express()
}
