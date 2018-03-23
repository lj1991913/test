

module.exports = function(url,data,method,success,error){
	$.ajax({
		url :url,
		method :method,
		success :function(data){
			success(data);
		},
		error : function(){

		}
	})

};