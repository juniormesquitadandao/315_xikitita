!function(window){"use strict";var Xikitita={window:this,afterInit:[],defineProperties:function(t,e){var i=this;Object.keys(e).forEach(function(n){i.defineProperty(t,n,e[n])})},defineProperty:function(t,e,i){t.hasOwnProperty(e)||Object.defineProperty(t,e,i)}};Object.defineProperty(Xikitita,"init",{get:function(){return this.classes={},this.inflection={singular:{},plural:{}},this.translations={},this.validators={},this.afterInit.forEach(function(t){t()}),this}}),Xikitita.Inflection=function(body){var __this__=this,irregular=function(t,e){__this__.inflection.singular[t]=e,__this__.inflection.plural[e]=t};return eval("new function (){\n      var irregular = #{irregular};\n      (#{body})(this);\n    };".interpolate({irregular:irregular.toString(),body:body.toString()})),__this__},Xikitita.I18n=function(t,e){return this.translations[t]=e||{},this},Xikitita.afterInit.push(function(){var t=Xikitita;eval.call(t.window,"var I18n;"),I18n={locale:"en",translate:function(e,i){var n=e,a=t.translations[I18n.locale];return e.split(".").forEach(function(t){a=a[t]}),"string"==typeof a?(n=a,i=i||{},n=n.interpolate(i,"%")):"object"==typeof a&&"Array"===a.constructor.name&&(n=a),n},localize:function(e,i){i=i||{};var n=i.format||"default",a=i.dateType||"date",s=e;if("object"==typeof e&&"Date"===e.constructor.name){var r=e.getDay(),o=e.getMonth()+1,l=e.getDate(),c=e.getFullYear(),u=e.getHours(),_=e.getMinutes(),f=e.getSeconds(),g=12>u?"am":"pm",d=e.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];s=t.translations[I18n.locale][a].formats[n];var h={"function":function(){s=s(e)},string:function(){var t={date:function(){s=s.interpolate({a:I18n.t("date.abbrDayNames")[r],A:I18n.t("date.dayNames")[r],m:new String(o+100).toString().substr(1),b:I18n.t("date.abbrMonthNames")[o],B:I18n.t("date.monthNames")[o],d:new String(l+100).toString().substr(1),Y:c},"%",!1)},time:function(){s=s.interpolate({h:new String((u||24)-12+100).toString().substr(1),H:new String(u+100).toString().substr(1),M:new String(_+100).toString().substr(1),S:new String(f+100).toString().substr(1),p:I18n.t(["time",g].join(".")),z:d},"%",!1)},datetime:function(){this.date(),this.time()}};t[a]()}};h[typeof s]()}else if("number"==typeof e){var v=t.translations[I18n.locale].integer.formats[n];(/\./.test(e)||i.forceDecimal)&&(v=t.translations[I18n.locale].decimal.formats[n]),s=v(e)}else"boolean"==typeof e&&(s=t.translations[I18n.locale].logic.formats[n][e]);return s}},I18n.t=I18n.translate,I18n.l=I18n.localize}),Xikitita.Error=function(t){var e=this,i=t;Object.defineProperties(e,{add:{value:function(t,i){e[t]=e[t]||[],e[t].push(i)}},clear:{get:function(){for(var t in e)delete e[t]}},messages:{get:function(){var t=[];return Object.keys(e).forEach(function(i){e[i].forEach(function(e){t.push(e)})}),t}},fullMessages:{get:function(){var t=[];return Object.keys(e).forEach(function(n){var a=["classes",i,"attributes",n].join("."),s=I18n.t(a);e[n].forEach(function(e){var i=I18n.t("errors.format").interpolate({attribute:s,message:e},"%");t.push(i)})}),t}}})},Xikitita.Class=function(name,body){eval.call(Xikitita.window,"function #{name}(){\n      var Xikitita = Xikitita;\n      var __class__ =  #{name};\n      var __attrAccessor__ = [];\n      \n      var object = this;\n      var attrAccessor = #{attrAccessor};\n      \n      var __id__ = 'id';\n      var id = #{id};\n      var __afterNew__ = [];\n      \n      var __belongsToClasses__ = {};\n      var belongsTo = #{belongsTo};\n      \n      var __hasOneClasses__ = {};\n      var hasOne = #{hasOne};\n      \n      var __hasManyClasses__ = {};\n      var hasMany = #{hasMany};\n      \n      var __errors__ = new #{Error}(__class__.name.toLowerCase());\n      var __validations__ = [];\n      Object.defineProperties(object, {\n        'errors': {get: #{errors}, enumerable: false },\n        'isValid': {get: #{isValid}, enumerable: false }\n      });\n      \n      var validate = #{validate};\n      \n      var validates = #{validates};\n      \n      var def = #{def};\n      var defClass = #{defClass};\n      \n      #{validatesOf}\n      \n      (#{body})(object);\n      attrAccessor();\n      \n      var __initAttributes__ =  Array.prototype.slice.call(arguments).shift() || {};\n      (#{new})(object);\n      \n      Object.defineProperties(object, {\n        'reset': {get: #{reset}, enumerable: false },\n        'changes': {get: #{changes}, enumerable: false },\n        'changed': {get: #{changed}, enumerable: false }\n      });\n    };".interpolate({name:name,attrAccessor:Xikitita.attrAccessor.toString(),id:Xikitita.id.toString(),belongsTo:Xikitita.belongsTo.toString(),hasOne:Xikitita.hasOne.toString(),hasMany:Xikitita.hasMany.toString(),Error:Xikitita.Error.toString(),errors:Xikitita.errors.toString(),isValid:Xikitita.isValid.toString(),validate:Xikitita.validate.toString(),validates:Xikitita.validates.toString(),def:Xikitita.def.toString(),defClass:Xikitita.defClass.toString(),validatesOf:Xikitita.validatesOf(),body:body.toString(),"new":Xikitita["new"].toString(),reset:Xikitita.reset.toString(),changes:Xikitita.changes.toString(),changed:Xikitita.changed.toString()}));var Class=eval(name);return Object.defineProperty(Class,"toHumanMember",{get:function(){var t=Class.name.toLowerCase(),e=["classes",t,"member"].join(".");return I18n.t(e)}}),Object.defineProperty(Class,"toHumanCollection",{get:function(){var t=Class.name.toLowerCase(),e=["classes",t,"collection"].join(".");return I18n.t(e)}}),Object.defineProperties(Class.prototype,{Xikitita:{get:function(){return Xikitita}}}),this.classes[name]=Class,this},Xikitita.id=function(t){__id__=t,Object.defineProperty(object,"__idValue__",{get:function(){return object[__id__]}})},Xikitita.attrAccessor=function(){var t=Array.prototype.slice.call(arguments);0===__attrAccessor__.length&&t.unshift(__id__),t.forEach(function(t){object[t]=null,__attrAccessor__.push(t)})},Xikitita["new"]=function(){function t(t){var e=["changes",t].join("_");object.hasOwnProperty(e)||Object.defineProperty(object,e,{get:function(){return this.changes[t]||[]}})}function e(t){var e=["changes",t].join("_"),i=["changed",t].join("_");object.hasOwnProperty(i)||Object.defineProperty(object,i,{get:function(){return this[e].isAny}})}"string"==typeof __initAttributes__&&(__initAttributes__=JSON.parse(__initAttributes__)),__attrAccessor__.forEach(function(i){__afterNew__.push(function(){t(i),e(i)})}),Object.keys(__initAttributes__).forEach(function(t){if(__attrAccessor__.indexOf(t)<0)throw new TypeError(__class__.name.toLowerCase()+"."+t+" is not a attribute");object[t]=__initAttributes__[t]}),__afterNew__.forEach(function(t){t()})},Xikitita.reset=function(){Object.keys(__belongsToClasses__).forEach(function(t){object[t]=null}),Object.keys(__hasOneClasses__).forEach(function(t){object[t]=null}),Object.keys(__hasManyClasses__).forEach(function(t){object[t]=[]}),Object.keys(__initAttributes__).forEach(function(t){object[t]=__initAttributes__[t]}),Object.keys(object).forEach(function(t){__initAttributes__.hasOwnProperty(t)||(object[t]=null)}),__afterNew__.forEach(function(t){t()})},Xikitita.changes=function(){var t={};return __attrAccessor__.forEach(function(e){var i=void 0===__initAttributes__[e]?null:__initAttributes__[e],n=object[e];i&&"object"==typeof i&&n&&"object"==typeof n?(i=i.asJson,__hasManyClasses__.hasOwnProperty(e)||Object.keys(n).forEach(function(t){i.hasOwnProperty(t)||(i[t]=null)}),i.toJson!==n.toJson&&(t[e]=[i,n])):i!==n&&(t[e]=[i,n])}),t},Xikitita.changed=function(){return this.changes.isAny},Xikitita.def=function(t,e){Object.defineProperty(object,t,{value:e,enumerable:!1})},Xikitita.defClass=function(t,e){__class__[t]=__class__[t]||e},Xikitita.belongsTo=function(classNameSingularized,options){var options=options||{},foreingKey=options.foreingKey||classNameSingularized+"_id",referenceKey=options.referenceKey||"id";Object.defineProperty(object,classNameSingularized,{get:function(){return object[classNameSingularized]=__belongsToClasses__[classNameSingularized],__belongsToClasses__[classNameSingularized]},set:function(value){value=value||null;var classTitleize=classNameSingularized.replace(/(\w)/,function(t){return t.toUpperCase()}),Class=eval(classTitleize);null!==value&&"Object"===value.constructor.name&&(value=new Class(value)),__belongsToClasses__[classNameSingularized]=value;var idValue=null;null!==value&&(idValue=value[referenceKey]),object[foreingKey]=idValue}}),__belongsToClasses__[classNameSingularized]=null,attrAccessor(foreingKey),__afterNew__.push(function(){if(__initAttributes__.hasOwnProperty(foreingKey)){var t={};t[referenceKey]=object[foreingKey],__belongsToClasses__[classNameSingularized]=t}})},Xikitita.hasOne=function(classNameSingularized,options){var options=options||{},foreingKey=options.foreingKey||__class__.name.toLowerCase()+"_id";Object.defineProperty(object,classNameSingularized,{get:function(){return object[classNameSingularized]=__hasOneClasses__[classNameSingularized],__hasOneClasses__[classNameSingularized]},set:function(value){value=value||null;var Class=eval(classNameSingularized.capitalize);null!==value&&(value[foreingKey]=object[__id__],"Object"===value.constructor.name&&(value=new Class(value))),__hasOneClasses__[classNameSingularized]=value}}),__hasOneClasses__[classNameSingularized]=null,attrAccessor(classNameSingularized)},Xikitita.hasMany=function(classNamePluralized,options){var options=options||{},foreingKey=options.foreingKey||__class__.name.toLowerCase()+"_id";Object.defineProperty(object,classNamePluralized,{get:function(){return __hasManyClasses__[classNamePluralized]=__hasManyClasses__[classNamePluralized]||[],object[classNamePluralized]=__hasManyClasses__[classNamePluralized],__hasManyClasses__[classNamePluralized]},set:function(values){values=values||null;var Class=eval(classNamePluralized.singularize.capitalize);null!==values&&(values=values.map(function(t){return t[foreingKey]=object[__id__],"Object"===t.constructor.name&&(t=new Class(t)),t})),__hasManyClasses__[classNamePluralized]=values}}),attrAccessor(classNamePluralized),__afterNew__.push(function(){__initAttributes__.hasOwnProperty(classNamePluralized)||(__initAttributes__[classNamePluralized]=[])})},Xikitita.validate=function(t,e){__validations__.push(function(){var i=e.call();if(!i.success){var n=i.fail.messageName,a=["errors","messages",n].join("."),s=i.fail.params||{};__errors__.add(t,I18n.t(a,s))}})},Xikitita.validates=function(t,e){Object.keys(e).forEach(function(i){var n={};"object"==typeof e[i]&&(n=e[i]),__validations__.push(function(){var e=object[t],a=object.Xikitita.validators[i](e,t,object,n);if(!a.success){var s=a.fail.messageName,r=["errors","messages",s].join("."),o=a.fail.params||{};__errors__.add(t,I18n.t(r,o))}})})},Xikitita.validatesOf=function(){var t=[];return Object.keys(Xikitita.validators).forEach(function(e){t.push("var validates#{validator}Of = ".interpolate({validator:e.capitalize})+function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),i="#{validatorName}",n={};n[i]=!0,"object"==typeof e?n[i]=e:t.push(e),t.forEach(function(t){validates(t,n)})}.toString().interpolate({validatorName:e})+";")}),t.join("\n")},Xikitita.errors=function(){return __errors__},Xikitita.isValid=function(){return __errors__.clear,__validations__.forEach(function(t){t()}),__errors__.isEmpty},Xikitita.Validator=function(t,e){return this.validators[t.toLowerCase()]=e,this},Xikitita.afterInit.push(function(){Xikitita.Validator("Presence",function(t,e,i,n){return{success:t?t.isAny:["number","boolean"].indexOf(typeof t)>-1,fail:{messageName:"blank"}}}).Validator("Length",function(t,e,i,n){var a={maximum:function(e){return{success:t?t.length<=e:!1,fail:{messageName:1===e?"too_long.one":"too_long.other",params:{count:e}}}},minimum:function(e){return{success:t?t.length>=e:!1,fail:{messageName:1===e?"too_short.one":"too_short.other",params:{count:e}}}},"in":function(t){var e=this.minimum(t[0]);return e.success?this.maximum(t[1]):e},is:function(e){return{success:t?t.length===e:!1,fail:{messageName:1===e?"wrong_length.one":"wrong_length.other",params:{count:e}}}}},s={success:!0};return Object.keys(a).forEach(function(e){var i=n[e]||null;if(i){var r=a[e](i);n.allowNull&&null===t&&(r.success=!0),r.success||(s=r)}}),s})}),Xikitita.afterInit.push(function(){Xikitita.defineProperties(Object.prototype,{toJson:{get:function(){var t=this;return"string"!=typeof this&&(t=JSON.stringify(t)),t}},asJson:{get:function(){return JSON.parse(this.toJson)}},isAny:{get:function(){return"Number"===this.constructor.name&&this>0||"Boolean"===this.constructor.name&&this||"Date"===this.constructor.name||Object.keys(this).length>0}},isEmpty:{get:function(){return!this.isAny}}})}),Xikitita.afterInit.push(function(){Xikitita.defineProperties(String.prototype,{capitalize:{get:function(){return this.replace(/(\w)/,function(t){return t.toUpperCase()})}},pluralize:{get:function(){var t=this,e=t,i=Xikitita.inflection.singular[t]||null;return i||(e=/$/,i="s"),this.replace(e,i)}},singularize:{get:function(){var t=this,e=t,i=Xikitita.inflection.plural[t]||null;return i||(e=/s$/,i=""),this.replace(e,i)}},interpolate:{value:function(t,e,i){e=e||"#",i=void 0===i?!0:i;var n=i?"{}":"  ",a=this;return Object.keys(t).forEach(function(i){var s=[e,n[0].trim(),i,n[1].trim()].join("");a=a.replace(new RegExp(s,"g"),t[i])}),a}}})}),Xikitita.afterInit.push(function(){Xikitita.defineProperties(Date.prototype,{localize:{value:function(t){return this.l(t)}},l:{value:function(t){return I18n.l(this,t)}}})}),Xikitita.afterInit.push(function(){Xikitita.defineProperties(Number.prototype,{localize:{value:function(t){return this.l(t)}},l:{value:function(t){return I18n.l(this,t)}}})}),Xikitita.afterInit.push(function(){Xikitita.defineProperties(Boolean.prototype,{localize:{value:function(t){return this.l(t)}},l:{value:function(t){return I18n.l(this,t)}}})}),window.Xikitita=Xikitita}(window);