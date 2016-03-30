/**
 * Created by Dongmin on 2016/3/29.
 */
define(function(require, exports, module) {
    module.exports = {
        say:function(){
            alert(this.name);
        },
        name:'张三'
    }
})