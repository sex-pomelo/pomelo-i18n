'use strict';

const fs = require('fs');
const util = require('util');


const ARRAY_INDEX_RE = /\{(\d+)\}/g;
function formatWithArray(text, values) {
  return text.replace(ARRAY_INDEX_RE, function (orignal, matched) {
    const index = parseInt(matched);
    if (index < values.length) {
      return values[index];
    }
    // not match index, return orignal text
    return orignal;
  });
}



class SexPomeloI81n{
	constructor( app, opts ){
		this.name = '__i18n__';
		this.opts = opts || {};
		this.locale = this.opts.locale;
		this.default = this.opts.default;
		if( !this.locale ){
			this.locale = [ this.default ];
		}

		let localePath = app.getBase() + '/locale';
		if( typeof( opts.path ) === 'string' ){
			localePath = app.getBase() + '/' + opts.path;
		}

		this.sexLocale = {};
		for( let it of this.locale ){
			let langPath = `${localePath}/${it}.js`;
			if( fs.existsSync(langPath) === true ){
					this.sexLocale[it] = require(langPath);
			}
		}

		this.defLocale = this.sexLocale[ this.default ];

		// reg tr function in app
		app.set( 'tr',( msg, ...paras )=>{
			if( !this.defLocale ) {
					return msg;
			}else{
				return this.gettext( this.defLocale,msg,...paras );
			}
		}, true);

		// reg tr1 function in app
		app.set( 'tr1',( locale,msg, ...paras )=>{
			if( !this.sexLocale[locale] ) {
					return msg;
			}else{
				return this.gettext( this.sexLocale[locale],msg,...paras );
			}
		}, true);

	}

	gettext( resource, key,value ) {
		let text = resource[key];
    if (text === undefined) {
      text = key;
    }

    if (!text) { 
			return '';
		}

    if (arguments.length === 2) {
      return text;
		}
	
    if (arguments.length === 3) {
      if (Array.isArray(value)) {
        return formatWithArray(text, value);
      }

      return util.format(text, value);
    }

    const args = new Array(arguments.length - 1);
    args[0] = text;
    for (let i = 2; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
		}
    return util.format.apply(util, args);
	}
}


module.exports = function(app, opts) {
  return new SexPomeloI81n(app, opts);
};

