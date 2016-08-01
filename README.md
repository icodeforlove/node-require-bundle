# require-bundle

allows you to transform a universal module (no system dependencies) into a string

# install

```
npm install require-bundle
```

# usage

```
var requireBundle = require('require-bundle');

requireBundle('string-saw').then(
	source => console.log(source),
	error => console.log(error.stack)
);
```