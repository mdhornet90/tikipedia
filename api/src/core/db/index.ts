import Knex from 'knex';

const stringcase = require('knex-stringcase');
const knexConfigs = require('./knexfile');

export const knex = Knex(stringcase(knexConfigs[process.env.NODE_ENV || 'development']));
