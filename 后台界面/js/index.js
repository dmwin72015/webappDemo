//配置模块
seajs.config({
    base: "./js/modules/",
    alias: {
        "jquery": "jquery-1.11.1.min.js",
        'datatable': 'jquery.dataTables.min.js',
        'index': 'index.js'
    }
});
// 加载入口模块
seajs.use('./js/modules/jquery-1.11.1.min.js', function() {
    $('.checkbox_label').click(function(ev){
    	$(this).toggleClass('selected');
    	return false;
    });
});