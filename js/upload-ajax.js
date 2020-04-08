let sizeUnit = (size) => {
    if (size < 1024) {
        return size + 'B'
    } else if (size < 1024 * 1024) {
        return Math.round(size / 1024) + 'KB'
    } else {
        return Math.round(size / 1024 / 1024) + 'MB'
    }
}

$(function() {
    // 单文件上传
    $('.single .submit').on('click', function() {

        var fileList = $('#singleFile')[0].files;
        //console.log(fileList);

        var formData = new FormData();
        //此处文件名必须为 singleFile ，因为后台设置仅接口此文件名
        formData.append('singleFile', fileList[0]);
        $.ajax({
            url: '/upload/single',
            type: 'post',
            processData: false,
            contentType: false,
            //使用multer配合ajax时无需配置multipart/form-data，multer将自动配置，手动配置将报错，boundary not found
            data: formData,
            success: function(data) {
                pcyAlert('上传成功', 'green');
                console.log(data);
            },
            error: function(err) {
                if (fileList.length < 1) {
                    pcyAlert('请选择文件', 'blue')
                } else {
                    pcyAlert('上传失败:' + err, 'red')
                }
            }
        })
    });

    // 多文件上传
    $('#multerFile').on('change', function() {
        var fileList = $('#multerFile').get(0).files;
        $('#fileList > ol').html('');
        for (let i = 0; i < fileList.length; i++) {
            $('#fileList > ol').append(`<li>${$('#multerFile').get(0).files[i].name}</li>`)
        }
    });
    $('.multer .submit').on('click', function() {

        var fileList = $('#multerFile').get(0).files;
        var formData = new FormData();
        let sizeBit = 0;
        let fileSize = [];
        let fileName = [];
        for (let i = 0; i < fileList.length; i++) {
            //此处文件名必须为 multerFile ，因为后台设置仅接口此文件名
            formData.append('multerFile', fileList[i]);
            sizeBit += fileList[i].size;
            fileSize[i] = sizeUnit(fileList[i].size);
            fileName[i] = fileList[i].name;
        }
        $('.submit').attr('disabled', true);
        $('.upload-core').css('opacity', '.5');
        $('#loading').show();
        $.ajax({
            url: '/upload/multer',
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function(data) {
                $('.submit').attr('disabled', false);
                $('.upload-core').css('opacity', '1');
                $('#loading').hide();
                if (fileList.length < 1) {
                    pcyAlert('请选择文件', 'orange')
                } else {
                    pcyAlert('上传成功:' + sizeUnit(sizeBit), 'rgb(0,255,100)');

                    //定义json格式数据
                    let postData = {
                        "fileName": fileName,
                        "fileSize": fileSize
                    };

                    /**ajax的type,url,dataType,contentType,data属性*/
                    $.ajax({
                        type: 'POST',
                        url: '/db/insert',
                        dataType: "json",
                        //定义json数据格式
                        contentType: 'application/json',
                        //把json转为String传递给后台
                        data: JSON.stringify(postData),
                        success: function() {
                            alert(11111)
                        }
                    });

                    //clear slelection
                    $('#multerFile').select().val('');
                    $('#fileList > ol').html('');
                }
            },
            error: function(err) {
                pcyAlert('上传失败' + err, 'red')
            }
        })
    });

    // 可多次点击添加按钮，并预览
    let arr = [];
    let src = [];

    $('#upgteimg').on('change', function() {
        let $this = $(this)
        let url = URL.createObjectURL($this[0].files[0]);
        src.push(url);
        arr.push($this[0].files[0]);
        // console.log(arr);
        // console.log(src);
    })

    $('.upbefore .submit').on('click', function() {
        var formData = new FormData();
        for (let i = 0; i < arr.length; i++) {
            //此处文件名必须为 multerFile ，因为后台设置仅接口此文件名
            formData.append('multerFile', arr[i]);
        }
        $.ajax({
            url: '/upload/multer',
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function(data) {
                pcyAlert('上传成功');
            },
            error: function(err) {
                if (fileList.length < 1) {
                    pcyAlert('请选择文件')
                } else {
                    pcyAlert('上传失败', err)
                }
            }
        })
    })
})