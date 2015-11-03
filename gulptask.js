var gulp = require('gulp'),
	file = require('file');

gulp.task('localez-parser', function() {

	var dest        = './locales/output.js',
		prefix      = 'locale = ',
		filesCount  = 0,
		filesParsed = 0,
		results     = {},
		ext         = /\.(js(|x)|hbs|jade|es6)$/,
		patterns    = [
			"__\\('(.*?)'\\)",
			"\\{\\{__\\s'(.*?)'\\}\\}",
			'__\\("(.*?)"\\)',
			'\\{\\{__\\s"(.*?)"\\}\\}'
		];

	String.prototype.hashCode = function() {
		var hash = 0, i, chr, len;
		if(this.length == 0) return hash;
		for(i = 0, len = this.length; i < len; i++) {
			chr = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

	function parse(file) {

		patterns.forEach(function(pattern, i) {

			var regexGlobal = new RegExp(pattern, 'gmi'),
				regexFilter = new RegExp(pattern, 'mi'),
				keys        = file.match(regexGlobal);

			if(!keys) return;

			keys.forEach(function(string) {

				var key = string.match(regexFilter)[1];

				if(key) results[key.hashCode()] = key;

			});

		});

	}

	file.walk('./js/', function(err, dir, dirs, files) {

		if(err) throw err;

		files.forEach(function(file) {

			if(file.match(ext) && !file.match('.min.')) {

				filesCount++;

				fs.readFile(file, 'utf8', function(err, file) {

					if(err) throw err;

					parse(file);

					filesParsed++;

					if(filesParsed >= filesCount) save();

				})

			}

		});

	});

	function sortObject(map) {
		var newObject = {},
			keys      = _.sortBy(_.keys(map), function(a) {
				return map[a]
			});
		_.each(keys, function(k) {
			newObject[k] = map[k];
		});
		return newObject;
	}

	function save() {

		var data = JSON.stringify(sortObject(results), null, 4);

		console.log('\nSuccessfully parsed a locale to', dest, '\n\n', data);

		fs.writeFile(dest, prefix + data, 'utf-8', function(err) {
			if(err) return console.log(err);
		});

	}

});