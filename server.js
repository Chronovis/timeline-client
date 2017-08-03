const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');
const debounce = require('lodash.debounce');
const proxy = require('proxy-middleware');
const url = require('url');

const baseDir = './build';
const watchFiles = [
	baseDir + '/bundle.js',
	'index.html'
];

function onFilesChanged(event, file) {
	if (event === 'change') {
		browserSync.reload(file);
	}
}

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

const proxyOptions = url.parse('http://dev-server:3999');
proxyOptions.route = '/api';

browserSync.init({
	server: {
		baseDir: '.',
		middleware: [
			proxy(proxyOptions),
			modRewrite([
				'^/css/(.*)$ /css/$1 [L]',
				'^/js/(.*)$ /js/$1 [L]',
				'^/images/(.*)$ /images/$1 [L]',
				'^/fonts/(.*)$ /fonts/$1 [L]',
				'^[^\\.]*$ /index.html [L]'
			])
		]
	}
});
