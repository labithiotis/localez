# Localez

Tiny template focused library to handle localized strings:

`Examples`

```javascript
__('If {{g donator male(he) female(she) }} only had given {{g receiver male(him) female(her) }} {{i data.flowers zero( flowers) one( flower) other( flowers)}} then they\'d lived happily ever after.', {donator: 'male', receiver: 'female', data : { flowers: 1 }})
// "If he only had given her 1 flower then they'd lived happily ever after."
```

LOCALE SPEC

Parse string and inject appropriate variables,
process through each {{ }},
determine each type and return variable.

Types and Options have long and short distinguishes.

TYPES:
gender (g)        | Male or Female
integer (i)       | 1,2,3,4 etc..
number (n)        | one, two, three, four etc..

TYPES OPTIONS:
gender            | male, female
integer, number   | zero, one, few, many, other

VARIABLE:
This can be any valid json expression from json passed in:
data.profile.gender
> male


//TODO - Readme
