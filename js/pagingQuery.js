let myAjax = (pageData) => {
    $.ajax({
        type: 'POST',
        url: '/db/select',
        dataType: "json",
        //定义json数据格式
        contentType: 'application/json',
        //把json转为String传递给后台
        data: JSON.stringify(pageData),
        success: function(data) {
            $('#historyList>tbody').html('');
            for (let i = 0; i < data.length; i++) {
                $('#historyList>tbody').append(`
                    <tr>
                        <td>${data[i].id}</td> 
                        <td>${data[i].fileName}</td> 
                        <td>${new Date(data[i].uploadDate).format("yyyy年MM月dd日 hh小时mm分ss秒") }</td>
                        <td>${data[i].fileSize}</td>
                    </tr>`)
            }
        },
        error: function() {
            console.error('获取数据库数据失败')
        }
    });
};

$(function() {
    let countData = 0;
    $.ajax({
        type: 'GET',
        url: '/db/dataSize',
        dataType: 'json',
        async: false,
        success: function(data) {
            countData = data[0].count
        }
    });

    let pageIndex = 0;
    myAjax({
        "pageIndex": pageIndex
    })
    $('#next-page').click(function() {
        pageIndex++;
        let pageData = {
            "pageIndex": pageIndex
        };

        countData / 5 > pageIndex ? myAjax(pageData) : pcyAlert('已经是最后一页了', 'orange')
    })
})