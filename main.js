require('bootstrap/dist/css/bootstrap')
require('file?name=[name].[ext]!bootstrap/dist/css/bootstrap.css.map')
require('loaders.css/loaders')

const styles = require('./styles')
const routes = require('./routes')

require('react-dom').render(routes(), document.getElementById('main'))
