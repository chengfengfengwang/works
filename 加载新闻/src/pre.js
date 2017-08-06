var container = document.querySelector('.container');
var loadMore = $('.load-more');
var index = 0;
var isLoading = false;
getNews(5);
$(window).on('scroll', function () {
    if (isVisible(loadMore)) {
        setTimeout(function () {
            getNews(index + 5)   //每次加载5条

        }, 400)
    }
})
function getNews(num) {
    if (isLoading) { return }  //状态锁，防止数据到来之前多次发送
    isLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response)
                var newsList = response['showapi_res_body']['pagebean']['contentlist'];
                console.log(index)
                for (var i = index; i < newsList.length; i++) {
                    var div = document.createElement('div');
                    var p = document.createElement('p');
                    var img = new Image();
                    p.innerText = newsList[i].title;
                    //
                    if (newsList[i]['imageurls'].length === 0) { console.log('没有内容') }
                    else {
                        img.src = newsList[i]['imageurls'][0]['url'];
                    }
                    div.appendChild(img);
                    div.appendChild(p);
                    container.appendChild(div);
                }
                index += 5        //当前索引
                isLoading = false; //结束状态锁
            } else {
                console.error(xhr.statusText)
            }
        }
    }
    var apiUrl = 'http://route.showapi.com/109-35?channelName=' +
        encodeURI('数码') +
        '&maxResult=' +
        num +
        '&showapi_sign=c356080c97b840968441f35e8e074536&showapi_appid=41618'
    xhr.open('GET', apiUrl, true)
    xhr.send(null);
}
function isVisible(node) {
    var curWindowHeight = $(window).height(),
        nodeOffsetTop = node.offset().top,
        windowScrollTop = $(window).scrollTop();
    if (nodeOffsetTop < (windowScrollTop + curWindowHeight) && windowScrollTop < (nodeOffsetTop + node.height())) {
        return true
    } else {
        return false
    }
}