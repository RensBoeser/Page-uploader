# js-yaml-promise

Promise wrapper around [js-yaml][js-yaml]. Assumes a Promise implementation is present.

```
npm install --save js-yaml-promise
```

All methods are the exact same, just return a Promise around the `try/catch`, for example:

```javascript
const yaml = require('js-yaml')

exports.safeLoad = (string, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.safeLoad(string, options))
  } catch (err) {
    reject(err)
  }
})
```

I made this since [node-yaml][node-yaml] did not provide a Promise wrapper
around `safeLoad` and `safeDump`, it merely exposed `parse` as `load` from
js-yaml. As well I prefer wrappers to do exactly that - wrap - not add extra
methods.

[js-yaml]: https://github.com/nodeca/js-yaml
[node-yaml]: https://github.com/octet-stream/node-yaml

## License

[MIT](https://jmazz.mit-license.org/)
