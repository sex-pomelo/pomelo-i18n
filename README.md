# pomelo-i81n
Pomelo i81n plugin.

# How To
## Locale file directory
  You Set path param， set locale file path.

```
+ app
+ config
+ locale    // << default path Locale file is here
  - en-US.js
  - zh-CN.js
```

### file
``` js
// locale/zh-CN.js
module.exports = {
  Email: '邮箱',
  'Welcome back, %s!': '欢迎回来，%s!',
  'Hello {0}! My name is {1}.': '你好 {0}! 我的名字叫 {1}。',
};
```

## Use plugin

### Register plugin to pomelo
``` js
const i81n = require('@sex-pomelo/pomelo-i18n'); 
...
app.configure('production|development' ,'!master',function() {
    app.use(i81n,{
        i81n:{
          path: 'app/locale',          // set locale path，optional
          locale: ['en-US','zh-CN'],   // use locale, optional
          default: 'en-US'             // default locale, required
        }
    });
});
...

```
### Use
 * If texts contain format function like ```%s```，```%j```, we can call by the way similar to ```util.format()```.
 * Support array, subscript and placeholder

``` js
  app.tr('SystemBusy');

  app.tr1('en-US', 'SystemBusy');

  app.tr('Welcome back, %s!', 'Shawn');

  app.tr('Hello {0}! My name is {1}.', ['foo', 'bar']);

```







