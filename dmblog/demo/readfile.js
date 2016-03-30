var fs = require('fs');
var path = require('path');
var out = process.stdout;
var path = __dirname;

//小文件的复制
function copySmallFile(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}
//大文件复制，添加进度、时间等信息，详细版
function copyBigFile(src, dst) {
    var readStream = fs.createReadStream(src); //创建读取流
    var writeStream = fs.createWriteStream(dst); //创建写入流
    var stat = fs.statSync(src); //获取文件信息（同步）
    var totalSize = stat.size;
    var passedLength = 0;
    var lastSize = 0;
    var startTime = Date.now();
    var timer = null;
    readStream.on('data', function(chunk) {
        passedLength += chunk.length;
        if (writeStream.write(chunk) === false) { // 当有数据流出时，写入数据
            readStream.pause(); // 如果没有写完，暂停读取流
        }
    })
    readStream.on('end', function() {
        clearInterval(timer); // 当没有数据时，关闭数据流
        writeStream.end('复制完成.....关闭写入流');
    });
    writeStream.on('open', function() {
        console.log('开始复制......');
    });
    writeStream.on('drain', function() { // 写完后，继续读取
        readStream.resume();
    });
    writeStream.on('finish',function(){
    	console.log('复制完成......');
    })
    timer = setInterval(function show() {
        var percent = Math.ceil((passedLength / totalSize) * 100);
        var size = Math.ceil(passedLength / 1000000);
        var diff = size - lastSize;
        lastSize = size;
        // out.clearLine();
        // out.cursorTo(0);
        out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff + 'MB/s\n');
        if (passedLength < totalSize) {
            setTimeout(show, 500);
        } else {
            var endTime = Date.now();
            console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
        }
    }, 1000);
}
//简单版，自动完成
function copyBigFile2(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
var src = 'a.mp4';
var dst = 'a_copy.mp4';
copyBigFile(src, dst);
