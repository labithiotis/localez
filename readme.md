# Localez

Localization is a pain, speically when dealing with gender specific translations, other libraries have tackled this with complexe json/xml structures. This library works similar to templating libraries, allowing transaltion to be self contianed and inline with text.

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
|&nbsp;&nbsp;&nbsp;&nbsp;`warn`|background: #990f0f; color: #ffc7c7||
|&nbsp;&nbsp;&nbsp;&nbsp;`error`|background: #990f0f; color: #ffc7c7||
|openTag|{{||
|closeTag|}}||
|matchers|||
|&nbsp;&nbsp;&nbsp;&nbsp;`type`|/^(\\s+)?\w+/i||
|&nbsp;&nbsp;&nbsp;&nbsp;`variable`|/^(\\s+)?[\w\.]+/i||
|markers|||
|&nbsp;&nbsp;&nbsp;&nbsp;`gender`|['gender', 'g']||
|&nbsp;&nbsp;&nbsp;&nbsp;`integer`|['integer', 'i']||
|&nbsp;&nbsp;&nbsp;&nbsp;`number`|['number', 'n']||
|numberEnum|||
|&nbsp;&nbsp;&nbsp;&nbsp;`zero`|zero||
|&nbsp;&nbsp;&nbsp;&nbsp;`one`|one||
|&nbsp;&nbsp;&nbsp;&nbsp;`two`|two||
|&nbsp;&nbsp;&nbsp;&nbsp;`few`|few||
|&nbsp;&nbsp;&nbsp;&nbsp;`many`|many||
|&nbsp;&nbsp;&nbsp;&nbsp;`other`|other||
|numbers|function(number, enums)||
|numberToString|function(number, enums)||
