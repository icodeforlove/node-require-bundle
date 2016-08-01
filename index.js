var fs = require('fs'),
	appRootDir = require('app-root-dir').get(),
	MemoryFS = require('memory-fs'),
	webpack = require('webpack');

function requireSource (name) {
	return new Promise (function (resolve, reject) {
		var modulePath = appRootDir + '/node_modules/' + name;

		fs.readFile(modulePath + '/package.json', 'utf8', function (error, packageSource) {
			if (error) {
				return reject(error);
			}

			try {
				var packageJSON = JSON.parse(packageSource),
					entryPoint = modulePath + '/' + packageJSON.main,
					memoryFS = new MemoryFS();

				var compiler = webpack({
					entry: entryPoint,
					output: {
						path: '/',
						filename: 'output.js'
					}
				});

				compiler.outputFileSystem = memoryFS;
				compiler.run(function(error, stats) {
					if (error) {
						return reject(error);
					}
					// this is not sync because its the memory-fs
					resolve(memoryFS.readFileSync('/output.js', 'utf8'));
				});
			} catch (error) {
				reject(error);
			}
		});
	});
}

module.exports = requireSource;