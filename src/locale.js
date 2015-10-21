(function() {

  'use strict';

  var locales,
      invoker = '__',
      _globals = (function() { return this || (0, eval)('this'); }());

  String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr  = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  };

  Object.prototype.getDescendant = function(s) {
    if (typeof s !== 'string') return;
    var _this = this,
				arr = s.split('.');
    while (arr.length && (_this = _this[arr.shift()]));
    return _this;
  };

  function extend(a, b) {
    var key;
    for (key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  function Locales(options) {

    if (typeof options === 'string') return;

    options = options || {};

    this.lang = options.langDefault || 'en';
    this.langDir = options.langDir || './locales/';
    this.langExt = options.langExt || '.json';

    this.locales = {};

    // Init with en locale
    this.locales[this.lang] = new Locale({config: options});

    if (!(typeof module !== 'undefined' && module.exports)) {
      try {
        this.lang = navigator.language.match(/^([^-]*)/)[0];
      } catch (y) {
        console.warn('Unable to determine device language.');
      }
    }

    return this;

  }

  Locales.prototype.parse = function(string, data, lang) {
    return this.locales[lang || this.lang].parse.apply(this.locales[lang || this.lang], arguments);
  };

  Locales.prototype.load = function(lang) {
    console.log('Load locale %s from %s', lang, this.langDir + this.lang + this.langExt);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        this.locales[lang] = new Locale(JSON.parse(xhr.responseText));
      }
    }.bind(this);
    xhr.open('GET', this.langDir + this.lang + this.langExt, true);
    xhr.send(null);
  };

  function Locale(locale) {

    this.locale = locale;

    this.options = extend({
      debug: false,
      debugConsoleStyle: {
        warn: 'background: #222; color: #bada55',
        error: 'background: #990f0f; color: #ffc7c7',
      },
      openTag: '{{',
      closeTag: '}}',
      matchers: {
        type: /^(\\s+)?\w+/i,
        variable: /^(\\s+)?[\w\.]+/i,
      },
      markers: {
        gender: ['gender', 'g'],
        integer: ['integer', 'i'],
        number: ['number', 'n'],
      },
      numberEnum: {
        zero: 'zero',
        one: 'one',
        two: 'two',
        few: 'few',
        many: 'many',
        other: 'other',
      },
      numbers: function(number, enums) {
        var	b = number % 10;
        return (~~(number % 100 / 10) === 1) ? enums.many :
        (b === 1) ? enums.one :
        (b === 2) ? enums.two :
        (b === 3) ? enums.few : enums.other;
      },

      numberToString: function(n) {
        if (n === 0) return 'zero';
        var a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var b = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        var g = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
        var grp = function grp(n) {
          return ('000' + n).substr(-3);
        };

        var rem = function rem(n) {
          return n.substr(0, n.length - 3);
        };

        var fmt = function fmt(_ref) {
          var h = _ref[0];
          var t = _ref[1];
          var o = _ref[2];
          return [Number(h) === 0 ? '' : a[h] + ' hundred ', Number(o) === 0 ? b[t] : b[t] && b[t] + '-' || '', a[t + o] || a[o]].join('');
        };

        var cons = function cons(xs) {
          return function(x) {
            return function(g) {
              return x ? [x, g && ' ' + g || '', ' ', xs].join('') : xs;
            };
          };
        };

        var iter = function iter(str) {
          return function(i) {
            return function(x) {
              return function(r) {
                if (x === '000' && r.length === 0) return str;
                return iter(cons(str)(fmt(x))(g[i]))(i + 1)(grp(r))(rem(r));
              };
            };
          };
        };

        return (n < 0 ? 'minus ' : '') + iter('')(0)(grp(String(n)))(rem(String(n)));
      },

    }, locale ? locale.config : {});

    return this;

  }

  Locale.prototype.log = function() {
    return this.options.debug && console.log.apply(console, arguments);
  };

  Locale.prototype.parseError = function() {
    console.error.apply(console, arguments);
    return '';
  };

  // Parse the string for expressions
  Locale.prototype.parse = function(string, data) {
    // small function to create a temp variable for result
    if (typeof string !== 'string') return this;
    if (data && typeof data !== 'object') return console.error('Second argmument should to be a {object}');
    return this.parseString(this.getLocaleString(string), null, data);
  };

  // Returns the translation string from locale
  Locale.prototype.getLocaleString = function(key) {
    this.log('Get transaltion string from locale resource');
    return this.locale ? this.locale[String(key).hashCode()] || key : key;
  };

  // Starts the parsing of the string
  Locale.prototype.parseString = function(string, result, data) {

    result = result || '';

    this.log('Parse string for next expression');

    var expressions = string.match(new RegExp(this.options.openTag + '(.*?)' + this.options.closeTag, 'gmi'));

    if (expressions && expressions.length > 0) {

      // has expression
      // Store index of where next expression opens
      var nextExpression = expressions[0],
      indexOfOpenExpression, indexOfCloseExpression, index;

      indexOfOpenExpression = string.indexOf(this.options.openTag);

      // nested expression check
      // close off each open expression untill count equals 0
      try {

        var openExpressions = nextExpression.match(new RegExp(this.options.openTag, 'gmi')),
        closedExpressions = nextExpression.match(new RegExp(this.options.closeTag, 'gmi')),
        count = openExpressions.length - closedExpressions.length;

        while (count > 0) {

          // added from string the next closing tag for expression and
          var endOfCurrentExpressionIndex = indexOfOpenExpression + nextExpression.length,
          endOfNextClosingTag = string.indexOf(this.options.closeTag, indexOfOpenExpression + nextExpression.length);
          nextExpression += string.substr(endOfCurrentExpressionIndex, endOfNextClosingTag - endOfCurrentExpressionIndex + this.options.closeTag.length);

          // Updat count for while
          openExpressions = nextExpression.match(new RegExp(this.options.openTag, 'gmi'));
          closedExpressions = nextExpression.match(new RegExp(this.options.closeTag, 'gmi'));
          count = openExpressions.length - closedExpressions.length;

        }

      } catch (e) {
        console.error('Unable to parse string:', string);
        return result;
      }

      // Update result to all contents before string
      result += string.substr(0, indexOfOpenExpression);

      // Update result with first expression results
      result += this.parseExpression(nextExpression, data);

      // Update string to end of expression (index + expression)
      string = string.substr(indexOfOpenExpression + nextExpression.length);

      // Resume parsing the string
      return this.parseString(string, result, data);

    } else {

      // No more expressions so just return last section of string
      return result += string;

    }

  };

  // Check if supplied string has a expression
  Locale.prototype.parseExpression = function(expression, data) {

    // strip off start and end tags for expression
    expression = expression.substr(this.options.openTag.length, expression.length - this.options.openTag.length - this.options.closeTag.length).trim();

    this.log('Parse Expression');
    this.log('%c' + expression, this.options.debugConsoleStyle.warn);

    try {

      var regex = this.options.matchers.type instanceof RegExp ? this.options.matchers.type : new RegExp(this.options.matchers.type, 'i'),
      type = expression.match(regex);

      if (!type || type.length === 0) return this.parseError('No type found in expression:', option);

      type = type[0];

      this.log('Dertimed type for this expression is: %s', type);

      // strip out the type from expression
      if (type) expression = expression.substr(type.length).trim();

      if (this.options.markers.gender.indexOf(type) >= 0) {
        return this.parseExpressionGender(expression, data);
      } else if (this.options.markers.number.indexOf(type) >= 0) {
        return this.parseExpressionNumber(expression, data);
      } else if (this.options.markers.integer.indexOf(type) >= 0) {
        return this.parseExpressionInteger(expression, data);
      } else {
        console.warn('Unable to get defined type in this expression.');
        console.warn('%c' + expression, this.options.debugConsoleStyle.warn);
        throw Error();
      }

    } catch (e) {
      throw e;
      return '';
    }

  };

  // parse expression for variables
  Locale.prototype.extractComponentsInExpression = function(expression) {

    this.log('the expression to parse for gender is', expression);

    var _this = this,

    	regex = this.options.matchers.variable instanceof RegExp ? this.options.matchers.variable : new RegExp(this.options.matchers.variable, 'i'),
    	variable = expression.match(regex),
    	sections = {},
    	options;

    if (!variable || variable.length === 0) return this.parseError('No variable found in expression:', option);

    variable = variable[0];

    // remove variable length from epxression string to find sections
    expression = expression.substr(variable ? variable.length : 0).trim();

    // Get each option in expression
    options = expression.match(/((\w+\(\{\{).*?(\}\}\)))|((\w+\().*?(\)))/gi);

    if (!options || options.length === 0) return _this.parseError('No options found in expression:', option);

    options.forEach(function(option) {

      var type = option.match(regex);

      if (!type || type.length === 0) return _this.parseError('No options found in expression:', option);

      type = type[0];

      if (typeof type === 'string' && type.length > 0) {
        option = option.substr(type.length + 1);
        option = option.substr(0, option.length - 1);
        sections[type.toLowerCase()] = option;
      }

    });

    return { variable: variable, options: sections };

  };

  // Parse Expresssion type gender
  Locale.prototype.parseExpressionGender = function(expression, data) {

    this.log('Parse expression for %cGender', this.options.debugConsoleStyle.error);

    var components 	= this.extractComponentsInExpression(expression),
    		variable 		= data.getDescendant(components.variable),
    		option 			= components.options[variable];

    this.log(components);

    // returns the options for male or female if found
    return option ? this.parseString(option) : '';

  };

  // Parse Expresssion type integer
  Locale.prototype.parseExpressionInteger = function(expression, data) {

    this.log('Parse expression %cInteger', this.options.debugConsoleStyle.error);

    var components   	= this.extractComponentsInExpression(expression),
    		variable 		 	= data.getDescendant(components.variable),
    		number,
				numberKey,
				result;

    if (!variable) return this.parseError('The variable: ' + variable + ' can\'t be found.');

    number 	 	   = parseFloat(variable);
    numberKey    = this.options.numbers(number, this.options.numberEnum);
    result       = components.options[numberKey] || components.options.other;

    this.log(components);

    return result ? number + this.parseString(result) : '';

  };

  // Parse Expresssion type number
  Locale.prototype.parseExpressionNumber = function(expression, data) {

    this.log('Parse expression %cNumber', this.options.debugConsoleStyle.error);

    var components 	= this.extractComponentsInExpression(expression),
    		variable 		= data.getDescendant(components.variable),
    		number,
				numberKey,
				result;

    if (!variable) return this.parseError('The variable: ' + variable + ' can\'t be found.');

    number 	 	   = parseFloat(variable);
    numberKey    = this.options.numbers(number, this.options.numberEnum);
    result       = components.options[numberKey] || components.options.other;

    this.log(components);

    return result ? this.options.numberToString(number) + this.parseString(result) : '';

  };

  /** EXPORTS **/

  if (typeof module !== 'undefined' && module.exports) {

    // NPM
    Locales.prototype.load = function(lang, src) {
      this.locales[lang] = new Locale(require(src));
    };

    return module.exports = Locales

  } else if (typeof define === 'function' && define.amd) {

    // AMD
    define(function() {

      locales = new Locales();
      locales.load(locales.lang);
      _globals[invoker] = function() {
        return locales.locales[locales.lang].parse.apply(locales[locales.lang], arguments);
      };

      return locales;

    });

  } else {

    // GLOBAL
    try {
      locales = new Locales();
      locales.load(locales.lang);
      _globals[invoker] = function() {
        return locales.locales[locales.lang].parse.apply(locales.locales[locales.lang], arguments);
      };

    } catch (e) {
      console.error(e);
    }

  }

}());
