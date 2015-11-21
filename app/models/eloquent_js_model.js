function EloquentJsModel(name){
	eval('function name(){}'.replace(/\bname\b/, 'x'));
}

module.exports = EloquentJsModel;