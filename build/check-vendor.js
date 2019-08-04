const fs = require('fs');
const path = require('path');

const templateUrl = path.resolve(__dirname, '../node_modules/mpvue-loader/lib/mp-compiler/templates.js');

// source
const templateSource = "require('${prefix}static/js/manifest')";

// added source content
const templateContent = "require('${prefix}static/js/commons')";

// replace content
const replaceContent =
`${templateSource}
${templateContent}`;

module.exports = function() {
	let template = fs.readFileSync(templateUrl).toString();
	if (template.indexOf(templateContent) === -1) {
		template = template.replace(templateSource, replaceContent);
		fs.writeFileSync(templateUrl, template);
		console.log('Vender template replaced.')
	}
};

