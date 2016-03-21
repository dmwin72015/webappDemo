$(function () {
    var c = 0;
    function run() {
       c++;
       if (c == 3) {
           $('#focus ul').css('left', '0');
            c = 0;
        }
        $('#focus .list span').eq(c).addClass('cur').siblings('span').removeClass('cur');
        var left = c * -698;
        $('#focus ul').stop().animate({ left: left + 'px' },10);
    }
    var timer = setInterval(run, 3000);
    $('#focus .list span').hover(function () {
        clearInterval(timer);
        c = $(this).index();
        var left = c * -698;
        $('#focus ul').stop().animate({ left: left + 'px' },10);
        $(this).addClass('cur').siblings('span').removeClass('cur');
    }, function () {
        timer = setInterval(run, 3000);
    });
})
