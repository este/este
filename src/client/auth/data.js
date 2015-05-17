import {Record} from 'immutable';

const DataRecord = Record({
  email: '',
  password: ''
});

export default class Data extends DataRecord {}
