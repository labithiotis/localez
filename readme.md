# Localez

`****>> STILL UNDER CONSTRUCTION <<****`

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Localization is a pain, specially when dealing with gender specific translations and pluralization, other libraries have tackled this with complex `json`/`xml` structures. This library avoids that by working similar to existing templating libraries, allowing translation to be self contained and inline. Using ES6 templating string makes it even easier.

#### Installation

```javascript
/** Node / Server Setup **/
var __ = require('locaez')
/** AMD / RequireJS Setup **/
// Todo
/** Standalone / Browser Setup **/
// Library is automatically added to global/window scope
```

###### Usage

```javascript
__('I have {{integer n zero(bottles) one(bottle) other(bottles)}} of beer', {n: 10})
// I have 10 bottles of beer
__('{{gender g male(He) female(She)}} has {{integer n zero(like) one(like) other(likes)}}', {g: 'female', n: 103})
// She has 103 likes
```

#### Translations

The translations are stored in a `JSON` file which is loaded in and stored by it's language, the language that is initial loaded is pulled decided by UserAgent or if server side it can be loaded manually.

##### Example of a translation file
```json
{
	"config": {
		"lang": "en",
		"debug": false
	},
	"-1783117148": "This is a trsnaltion string"
}
```

The number stored for each translation is a unique HashCode of the requested string from the source code, reason for the library doing this, is for compression and readability of contents. 

Along with the with the locale translations, is the locale config which overrides all aspects of locale translation.

The unique HashCode is generated using the function below:
There's a [Gulp Task (localez/gulptask.js)](https://raw.githubusercontent.com/labithiotis/localez/master/gulptask.js) that trawls your source code and generates a translation file using same function.

```javascript
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
```

###### Question?
> Should library allow hashCode matching to be optional? And let developer decide to use `STRING CONST` instead, contact me if you believe so.

###### Localization Examples

```javascript
/** fen.js (loaded by localez) **/
locale = {
  '-1390162012': 'Morning',
  '-870584423': 'Good Afternoon',
  '-2022316621': 'What a wonderful day!',
  '-1392943720': 'You are {{gender target male({{n amount zero(sexy man) other(sexy men)}}) female({{n amount zero(sexy lady) other(sexy ladies)}})}}.',
  '-1672370112': 'There\'s {{integer bottles other(bottles) one(bottle)}} of beer on the wall.'
}

/** fr.js (loaded by localez) **/
locale = {
  '-1390162012': 'Matin',
  '-870584423': 'Bon après-midi',
  '-2022316621': 'Quel wonderfuly jour !',
  '1837336777': '{{gender target male({{n amount zero(vous êtes %i sexy homme) other(vous êtes %i hommes sexy)}}) female({{n amount zero(vous êtes %i dame sexy) other(vous êtes %i dames sexy)}})}}.',
  '-1672370112': 'There\'s {{integer bottles other(bottles) one(bottle)}} of beer on the wall.'
}

/** In Source Code **/
__('Morning')
// Matin

/** You can pass gender alternatives and pluralizers **/

__('There\'s {{i bottles other( bottles) one( bottle)}} of beer on the wall.', {bottles: 99})
// vous êtes deux dames sexy.

__('You are {{g target male({{n amount zero(sexy man) other(sexy men)}}) female({{n amount zero(sexy lady) other(sexy ladies)}})}}.', {amount: 2, target: 'female'})
// vous êtes deux dames sexy.
// Notices in the fr.json the sentences are all inside the expression for gender using number placement.

```

#### Load Locale
```javascript
/** Node / Server Setup **/
var path = require('path');
__.load('fr', path.resolve(__dirname + '/locales/fr.js'));

/** AMD / RequireJS Setup **/
// Todo

/** Standalone / Browser Setup **/
localez.load('fr')
// or say src
localez.load('fr', 'http://url.com/fr.json')

```

-------------

### Specification

Parse a string and inject appropriate variables if required.

`__(STRING, [OBJECT])`

The library works by first retrieving exact match of string from the stored locale (which is loaded on launch), next it converts that string to HashCode and looks for locale version. With that it then parses that string for `Types` which has `Options`.

##### Types

| Type Long | Type Shorthand | Type Options |
|-----|------|-----|
| gender | g | Can be what ever you want, it just needs to match up to variable passed in: `male` or `female`|
| integer | i | `zero`, `one`, `few`, `many`, `other` |
| number | n | `zero`, `one`, `few`, `many`, `other` |

In any `type` the second argument is always the variable used for options, the variable is gained from the passed in object.

Anything inside an option is also parsed for locale expressions

##### Examples (using shorthand from now on)

###### Genders
```javascript
__('It\'s a {{g profile male(Man\'s) female(Women\'s)}} world.', {profile: 'male'})
// It's a Mans world.
__('It\'s a {{g profile male(Man\'s) female(Women\'s)}} world.', {profile: 'female'})
// It's a Women's world.
```

###### Integers (pluralization)
```javascript
__('There\'s {{i bottles other(bottles) one(bottle)}} of beer on the wall.', {bottles: 99})
// There's 99 bottles of beer on the wall.
__('{{i bottles other(There\'s %i bottles) one(There was only %i bottle)}} of beer on the wall.', {bottles: 1})
// There was only 1 bottle of beer on the wall.
```
n.b. The library lets you decide if you want a gap between numbers using the `%i` to indicate where to place number, if non found it will be injected before string with space.

###### Numbers (pluralization)
```javascript
__('There\'s {{n bottles other( bottles) one( bottle)}} of beer on the wall.', {bottles: 99})
// There's ninety-nine bottles of beer on the wall.
```

#### Config per locale
Inside the locale that's loaded you can add a config that will only effect that locale, you can override different aspects of the parser dependant on each locale.
```json
"config": {
  "debug": BOOLEAN,
  "debugConsoleStyle": {
      "warn": STRING,
      "error": STRING
  },
  "openTag": STRING,
  "closeTag": STRING,
  "matchers": {
      "type": REGEX,
      "variable": REGEX
  },
  "markers": {
      "gender": [STRING, STRING],
      "integer": [STRING, STRING],
      "number": [STRING, STRING]
  },
  "numbersEnums": {
      "zero": STRING,
      "one": STRING,
      "two": STRING,
      "few": STRING,
      "many": STRING,
      "other": STRING
  },
  "numbers": FUNCTION,
  "numberToString": FUNCTION
},
000000: "TRANSLATION 1",
000001: "TRANSLATION 2",
000003: "TRANSLATION 3"
```

|Config Options|TYPE|Defaults||
|-----|-----|-----|-----|
|debug|`BOOLEAN`||If debug is enabled or not, default is false|
|debugConsoleStyle|`OBJECT`||
|&nbsp;&nbsp;&nbsp;&nbsp;`warn`|`STRING`|background: #990f0f; color: #ffc7c7|Styling for warning messages in console|
|&nbsp;&nbsp;&nbsp;&nbsp;`error`|`STRING`|background: #990f0f; color: #ffc7c7|Styling for error messages in console|
|openTag|`STRING`|{{|string to match on for opening an expression|
|closeTag|`STRING`|}}|string to match on for closing an expression|
|matchers|`OBJECT`|||
|&nbsp;&nbsp;&nbsp;&nbsp;`type`|`REGEX`|/^(\\s+)?\w+/i|Regex to extract the type inside an expression|
|&nbsp;&nbsp;&nbsp;&nbsp;`variable`|`REGEX`|/^(\\s+)?[\w\.]+/i|Regex to extract the variable in an expression |
|markers|`OBJECT`||These are the markers for types|
|&nbsp;&nbsp;&nbsp;&nbsp;`gender`|`STRING`|['gender', 'g']|Determines if the expression is a gender type|
|&nbsp;&nbsp;&nbsp;&nbsp;`integer`|`STRING`|['integer', 'i']|Determines if the expression is a integer type|
|&nbsp;&nbsp;&nbsp;&nbsp;`number`|`STRING`|['number', 'n']|Determines if the expression is a number type|
|numberEnum|`OBJECT`||Override the enums returned by the numbers function|
|&nbsp;&nbsp;&nbsp;&nbsp;`zero`|`STRING`|zero||
|&nbsp;&nbsp;&nbsp;&nbsp;`one`|`STRING`|one||
|&nbsp;&nbsp;&nbsp;&nbsp;`two`|`STRING`|two||
|&nbsp;&nbsp;&nbsp;&nbsp;`few`|`STRING`|few||
|&nbsp;&nbsp;&nbsp;&nbsp;`many`|`STRING`|many||
|&nbsp;&nbsp;&nbsp;&nbsp;`other`|`STRING`|other||
|numbers|`FUNCTION`|function(number, gender)|A function to decide which enum the value of the variable is, used to pick the option inside an expression|
|numberToString|`FUNCTION`|function(number, gender)|A function to convert an integer into number text (1 -> one)|

# Todo
- [x] Allow number (n/i) placement in option using %i
- [x] Added test for combination expressions
- [] Check AMD works
- [] Get translation functions for `numbers` and `numbersToString`:
	- [] French
	- [] German
	- [] Italian
	etc..
- [] Add tests to check for locale config overrides
- [] Add JS Coverage test (suggestions?  coveralls.io)
- [] Make hashCode optional, allowing string conts instead
- [] Create a plugin to do syntax highlighting for:
	- [] Webstorm IDE
	- [] Atom


# Author
#### Darren Labithiotis 
@labithiotis


# Support
If you would like to aid me, please feel free to contact me or buy me a beer :)


Still lost, let me know what additional information you need on this readme to help explain this library.

[npm-image]: https://img.shields.io/npm/v/localez.svg?style=flat
[npm-url]: https://npmjs.org/package/localez
[downloads-image]: https://img.shields.io/npm/dm/localez.svg?style=flat
[downloads-url]: https://npmjs.org/package/localez

[travis-image]: https://img.shields.io/travis/strongloop/localez.svg?style=flat
[travis-url]: https://travis-ci.org/strongloop/localez
[coveralls-image]: https://img.shields.io/coveralls/strongloop/localez.svg?style=flat
[coveralls-url]: https://coveralls.io/r/strongloop/localez?branch=master