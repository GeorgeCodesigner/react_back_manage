const tableList = require('./datas/tableList');
const login = require('./datas/login');
const register = require('./datas/register');
const userInfo = require('./datas/userInfo');

const prefix = '.json'

module.exports = {
  [`/login${prefix}`]: login,
  [`/register${prefix}`]: register,
  [`/userInfo${prefix}`]: userInfo,
  [`/tableList${prefix}`]: tableList,
}
