# Localez

`****>> STILL UNDER CONSTRUCTION <<****`

Localization is a pain, specially when dealing with gender specific translations, other libraries have tackled this with complex `json`/`xml` structures. This library avoids this by working similar to existing templating libraries, allowing translation to be self contained and inline with text.

The translation file is automatically loaded using navigator user-agent or require statement. This file contains the each translation string, stored by a unique number. Below is a gulp task that will generate the file automatically looking for references of locale invokers `__('')` or `{{__ ""}}`.

> May make the unique number optional and let developer decide to use `STRINT CONST` instead.

###### Example

```javascript

/** fr.js (loaded locale) **/
locale = {
  '-4213': 'Bonjour'
}

/** From code **/
__('Hello')
// Bonjour

/** You can pass gender alternatives and pluralizers **/
__('If {{g donator male(he) female(she) }} only had given {{g receiver male(him) female(her) }} {{i data.flowers zero( flowers) one( flower) other( flowers)}} then they\'d lived happily ever after.', {donator: 'male', receiver: 'female', data : { flowers: 1 }})
// If he only had given her 1 flower then they'd lived happily ever after.

```

`Todo`

1. Add tests
2. Check NPM/Node usage works
3. Choose locale to use for string `__(STRING, [DATA, LOCALE])`


-------------

### Specification

Parse a string and inject appropriate variables if required.

`__(STRING, [OBJECT])`

The library works by first retrieving exact match of string from the stored locale (which is loaded on launch), it then parses that string for `Types` which has `Options`

##### Types

| Type Long | Type Shorthand | Type Options |
|-----|------|-----|
| gender | g | Can be what ever you want, it just needs to match up to variable passed in: `male` or `female`|
| integer | i | `zero`, `one`, `few`, `many`, `other` |
| number | n | `zero`, `one`, `few`, `many`, `other` |

In any type the second argument is the variable used for options, the variable is gained from the passed in object.

Anything inside an option is also parsed for locale expressions

##### Examples

###### Genders
```javascript
__('It\'s a {{g profile male(Mans) female(Womens)}} world.', {profile: 'male'})
// It's a Mans world.
```

###### Integers (pluralization)
```javascript
__('There\'s {{i bottles other( bottles) one( bottle)}} of beer on the wall.', {flowers: 99})
// There's 99 bottles of beer on the wall.
```
n.b. The library lets you decide if you want a gap between numbers or not.

###### Numbers (pluralization)
```javascript
__('There\'s {{n bottles other( bottles) one( bottle)}} of beer on the wall.', {flowers: 99})
// There's ninety nine bottles of beer on the wall.
```

#### Config per locale
Inside the locale that's loaded you can add a config that will changed how the string is parsed.
```javascript
config: {
  debug: false,
}
```

|Option|Default||
|-----|-----|-----|
|debug||If debug is enabled or not, default is false|
|debugConsoleStyle||
|&nbsp;&nbsp;&nbsp;&nbsp;`warn`|background: #990f0f; color: #ffc7c7|Styling for warning messages in console|
|&nbsp;&nbsp;&nbsp;&nbsp;`error`|background: #990f0f; color: #ffc7c7|tyling for error messages in console|
|openTag|{{|string to match on for opening an expression|
|closeTag|}}|string to match on for closing an expression|
|matchers|||
|&nbsp;&nbsp;&nbsp;&nbsp;`type`|/^(\\s+)?\w+/i|Regex to extract the type inside an expression|
|&nbsp;&nbsp;&nbsp;&nbsp;`variable`|/^(\\s+)?[\w\.]+/i|Regex to extract the variable in an expression |
|markers||These are the markers for types|
|&nbsp;&nbsp;&nbsp;&nbsp;`gender`|['gender', 'g']|Determins if the expression is a gender type|
|&nbsp;&nbsp;&nbsp;&nbsp;`integer`|['integer', 'i']|Determins if the expression is a integer type|
|&nbsp;&nbsp;&nbsp;&nbsp;`number`|['number', 'n']|Determins if the expression is a number type|
|numberEnum||Not sure these should be exposed ....|
|&nbsp;&nbsp;&nbsp;&nbsp;`zero`|zero||
|&nbsp;&nbsp;&nbsp;&nbsp;`one`|one||
|&nbsp;&nbsp;&nbsp;&nbsp;`two`|two||
|&nbsp;&nbsp;&nbsp;&nbsp;`few`|few||
|&nbsp;&nbsp;&nbsp;&nbsp;`many`|many||
|&nbsp;&nbsp;&nbsp;&nbsp;`other`|other||
|numbers|function(number, enums)|A function to decide which enum the value of the variable is, used to pick the option inside an expression|
|numberToString|function(number, enums)|A function to convert an integer into number text (1 -> one)|

# Locale Generation

Below is a gulp task that will crawl your source directory for any translation references and spit them out to `./locales/output.js`

```javascript
var gulp = require('gulp'),
    file = require('file');

gulp.task('localez-parser', function() {

	var dest = './locales/output.js',
		prefix = 'locale = ',
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
		if (this.length == 0) return hash;
		for (i = 0, len = this.length; i < len; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

	function parse(file) {

		patterns.forEach(function(pattern, i) {

			var regexGlobal = new RegExp(pattern, 'gmi'),
				regexFilter = new RegExp(pattern, 'mi'),
				keys = file.match(regexGlobal);

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

				filesCount ++;

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
			keys =_.sortBy(_.keys(map), function(a) { return map[a] });
		_.each(keys, function(k) {
			newObject[k] = map[k];
		});
		return newObject;
	}

	function save() {

		var data = JSON.stringify(sortObject(results), null, 4);

		console.log('\nSuccessfully parsed a locale to', dest, '\n\n', data);

		fs.writeFile(dest, prefix + data, 'utf-8', function (err) {
			if (err) return console.log(err);
		});

	}

});
```
