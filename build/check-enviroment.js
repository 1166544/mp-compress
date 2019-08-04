var path = require('path');
var config = require('../config')
var fileName = path.join(__dirname, '../config/env.js');
var evnContent = process.env.NODE_ENV || JSON.parse(config.prod.env.NODE_ENV);
var evnLocal = process.env.NODE_LOCAL || '';

var envSavedContent =
`
export default {
  env: '${evnContent}'
};
`;

// 处理本地开发时,加上local特殊标记
if (evnLocal === 'local') {
	envSavedContent =
	`
	export default {
	  env: '${evnContent}',
	  local: '${evnLocal}'
	};
	`;
}

module.exports = function() {
  require('fs').writeFile(fileName, envSavedContent, 'utf8', function (error) {
    if (error) {
      throw error;
    } else {
      console.log('Enviroment flag successfully saved:: ', evnContent);
    }
  });
}
