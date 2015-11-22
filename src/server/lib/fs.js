import {promisifyAll} from 'bluebird';

const fs = promisifyAll(require('fs'));

export default fs;
