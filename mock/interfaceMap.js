const tableList = require('./datas/tableList');
const login = require('./datas/login');

const prefix = '.json'

module.exports = {
  [`/login${prefix}`]: login,
  [`/tableList${prefix}`]: tableList,
}
