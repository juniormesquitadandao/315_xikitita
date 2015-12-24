"use strict";Object.defineProperties(String.prototype,{capitalize:{get:function(){return this.replace(/(\w)/,function(e){return e.toUpperCase()})}},pluralize:{get:function(){var e=this,t=e,i=Xikitita.inflection.plural[e]||null;return i||(t=/$/,i="s"),this.replace(t,i)}},singularize:{get:function(){var e=this,t=e,i=Xikitita.inflection.singular[e]||null;return i||(t=/s$/,i=""),this.replace(t,i)}}}),Object.defineProperties(Array.prototype,{toJson:{get:function(){return JSON.stringify(this)}},asJson:{get:function(){return JSON.parse(this.toJson)}},isAny:{get:function(){return this.length>0}},isEmpty:{get:function(){return!this.isAny}}});var Xikitita={window:this};Object.defineProperty(Xikitita,"init",{get:function(){return this.models={},this.inflection={singular:{},plural:{}},this.translations={},this.validators={},eval.call(this.window,"var I18n;"),I18n={locale:"en",translate:function(e,t){var i=e,n=Xikitita.translations[I18n.locale];return e.split(".").forEach(function(e){n=n[e]}),"string"==typeof n&&(i=n,t=t||{},Object.keys(t).forEach(function(e){i=i.replace(new RegExp("#{"+e+"}","ig"),t[e])})),i},localize:function(e,t){t=t||"default";var i=e;if("object"==typeof e&&"Date"===e.constructor.name)i=Xikitita.translations[I18n.locale].date[t](e);else if("number"==typeof e){var n=Xikitita.translations[I18n.locale].integer[t];/\./.test(e)&&(n=Xikitita.translations[I18n.locale].decimal[t]),i=n(e)}else"boolean"==typeof e&&(i=Xikitita.translations[I18n.locale].logic[t](e));return i}},I18n.t=I18n.translate,I18n.l=I18n.localize,this.Validator("presence","blank",function(e,t,i,n){return null!==e}),this}}),Xikitita.Inflection=function(body){var irregular=function(e,t){Xikitita.inflection.singular[e]=t,Xikitita.inflection.plural[t]=e};return eval("new function (){\n      var irregular = #{irregular};\n      (#{body})(this);\n    };".replace(/#{irregular}/,irregular.toString()).replace(/#{body}/,body.toString())),this},Xikitita.I18n=function(e,t){return this.translations[e]=t||{},this},Xikitita.Error=function(e){var e=e;Object.defineProperties(this,{toJson:{get:function(){return JSON.stringify(this)}},asJson:{get:function(){return JSON.parse(this.toJson)}},isAny:{get:function(){return Object.keys(this).isAny}},isEmpty:{get:function(){return!this.isAny}},add:{value:function(e,t){this[e]=this[e]||[],this[e].push(t)}},clear:{get:function(){for(var e in this)delete this[e]}},messages:{get:function(){var e=this,t=[];return Object.keys(e).forEach(function(i){e[i].forEach(function(e){t.push(e)})}),t}},fullMessages:{get:function(){var t=this,i=[];return Object.keys(t).forEach(function(n){var a=I18n.t(["attributes",e,n].join("."));t[n].forEach(function(e){var t=I18n.t("errors.format").replace(/#{attribute}/,a).replace(/#{message}/,e);i.push(t)})}),i}}})},Xikitita.id=function(e){__id__=e,Object.defineProperty(self,"__idValue__",{get:function(){return self[__id__]}})},Xikitita.attrAccessible=function(){var e=Array.prototype.slice.call(arguments);0===__attrAccessible__.length&&e.unshift(__id__),e.forEach(function(e){self[e]=null,__attrAccessible__.push(e)})},Xikitita["new"]=function(){"string"==typeof __initAttributes__&&(__initAttributes__=JSON.parse(__initAttributes__)),Object.keys(__initAttributes__).forEach(function(e){if(__attrAccessible__.indexOf(e)<0)throw new TypeError(__model__.name.toLowerCase()+"."+e+" is not a attribute");self[e]=__initAttributes__[e]}),__afterNew__.forEach(function(e){e()})},Xikitita.def=function(e,t){Object.defineProperty(self,e,{value:t,enumerable:!1})},Xikitita.defSelf=function(e,t){__model__[e]=__model__[e]||t},Xikitita.Model=function(name,body){eval.call(Xikitita.window,"function #{name}(){\n      var Xikitita = Xikitita;\n      var __model__ =  #{model};\n      var __attrAccessible__ = [];\n      \n      var self = this;\n      var attrAccessible = #{attrAccessible};\n      \n      var __id__ = 'id';\n      var id = #{id};\n      var __afterNew__ = [];\n      \n      var __belongsToModels__ = {};\n      var belongsTo = #{belongsTo};\n      \n      var __hasOneModels__ = {};\n      var hasOne = #{hasOne};\n      \n      var __hasManyModels__ = {};\n      var hasMany = #{hasMany};\n      \n      var __errors__ = new #{Error}(__model__.name.toLowerCase());\n      var __validations__ = [];\n      Object.defineProperties(self, {\n        'errors': {get: #{errors}, enumerable: false },\n        'isValid': {get: #{isValid}, enumerable: false }\n      });\n      \n      var validates = #{validates};\n      \n      var def = #{def};\n      var defSelf = #{defSelf};\n      \n      #{validatesOf}\n      \n      (#{body})(this);\n      attrAccessible();\n      \n      var __initAttributes__ =  Array.prototype.slice.call(arguments).shift() || {};\n      (#{new})(this);\n    };".replace(/#{name}/,name).replace(/#{model}/,name).replace(/#{attrAccessible}/,Xikitita.attrAccessible.toString()).replace(/#{id}/,Xikitita.id.toString()).replace(/#{belongsTo}/,Xikitita.belongsTo.toString()).replace(/#{hasOne}/,Xikitita.hasOne.toString()).replace(/#{hasMany}/,Xikitita.hasMany.toString()).replace(/#{Error}/,Xikitita.Error.toString()).replace(/#{errors}/,Xikitita.errors.toString()).replace(/#{isValid}/,Xikitita.isValid.toString()).replace(/#{validatesOf}/,Xikitita.validatesOf()).replace(/#{validates}/,Xikitita.validates.toString()).replace(/#{def}/,Xikitita.def.toString()).replace(/#{defSelf}/,Xikitita.defSelf.toString()).replace(/#{new}/,Xikitita["new"].toString()).replace(/#{body}/,body.toString()));var Model=eval(name);return Object.defineProperties(Model.prototype,{toJson:{get:function(){return JSON.stringify(this)}},asJson:{get:function(){return JSON.parse(this.toJson)}},Xikitita:{get:function(){return Xikitita}}}),new Model,this.models[name]=Model,this},Xikitita.belongsTo=function(model,options){var options=options||{},foreingKey=options.foreingKey||model+"_id",referenceKey=options.referenceKey||"id";Object.defineProperty(self,model,{get:function(){return self[model]=__belongsToModels__[model]||null,__belongsToModels__[model]},set:function(value){value=value||null;var modelTitleize=model.replace(/(\w)/,function(e){return e.toUpperCase()}),Model=eval(modelTitleize);null!==value&&"Object"===value.constructor.name&&(value=new Model(value)),__belongsToModels__[model]=value;var idValue=null;null!==value&&(idValue=value[referenceKey]),self[foreingKey]=idValue}}),attrAccessible(foreingKey),__afterNew__.push(function(){var e={};e[referenceKey]=self[foreingKey],__belongsToModels__[model]=e})},Xikitita.hasOne=function(model,options){var options=options||{},foreingKey=options.foreingKey||__model__.name.toLowerCase()+"_id";Object.defineProperty(self,model,{get:function(){return self[model]=__hasOneModels__[model]||null,__hasOneModels__[model]},set:function(value){value=value||null;var Model=eval(model.capitalize);null!==value&&(value[foreingKey]=self[__id__],"Object"===value.constructor.name&&(value=new Model(value))),__hasOneModels__[model]=value}})},Xikitita.hasMany=function(models,options){var options=options||{},foreingKey=options.foreingKey||__model__.name.toLowerCase()+"_id";Object.defineProperty(self,models,{get:function(){return self[models]=__hasManyModels__[models],__hasManyModels__[models]},set:function(values){values=values||null;var Model=eval(models.singularize.capitalize);null!==values&&values.forEach(function(e){e[foreingKey]=self[__id__],"Object"===e.constructor.name&&(e=new Model(e))}),__hasManyModels__[models]=values}})},Xikitita.validates=function(e,t){Object.keys(t).forEach(function(i){var n=Object.create({});"Object"==typeof t[i]&&(n=Object.create(t[i])),__validations__.push(function(){if(!self.Xikitita.validators[i].call(self[e],e,self,n)){var t=self.Xikitita.validators[i].messageKey;__errors__.add(e,I18n.t("errors.messages."+t))}})})},Xikitita.validatesOf=function(){var e=[];return Object.keys(Xikitita.validators).forEach(function(t){e.push("var validates#{validator}Of = ".replace(/#{validator}/,t.capitalize)+function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){validates(e,"#{options}")})}.toString().replace(/'#{options}'/,"{"+t+": true}")+";")}),e.join("\n")},Xikitita.errors=function(){return __errors__},Xikitita.isValid=function(){return __errors__.clear,__validations__.forEach(function(e){e()}),__errors__.isEmpty},Xikitita.Validator=function(e,t,i){return Xikitita.validators[e]={messageKey:t,call:i},this};