const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// 创建一个数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pcy1314',
    port: '3306',
    database: 'ftpsystem'
});
// 从连接池中获取一个连接
let query = function(sql, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败，异常信息：' + err);
            callback(err, null, null);
        } else {
            // console.log('mysql数据库连接成功');
            conn.query(sql, (error, result, fields) => {

                if (error) {
                    console.log('查询数据库失败，异常信息：' + error);
                } else {
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(error, result, fields);
                }
            })
        }
    });
};


//insert API
router.post('/insert', (req, res) => {
    let fileName = req.body.fileName;
    let fileSize = req.body.fileSize;

    for (let i = 0; i < fileName.length; i++) {
        // translation ', \'\' or \\\'
        let _fileName = fileName[i].replace(/'/, '\'\'');
        let insertSQL = `
            insert into ftps(fileName,uploadDate,fileSize) 
                values('${_fileName}',sysdate(),'${fileSize[i]}')`;
        query(insertSQL, (err, result) => {
            if (err) console.log('上传失败');
        });
    }
});

//select API
//post request send data，Get request is not transfer data;
router.post('/select', (req, res) => {
    let pageIndex = req.body.pageIndex;
    let selectSQL = `SELECT * FROM ftps LIMIT 5 OFFSET ${pageIndex * 5}`;
    query(selectSQL, (err, result) => {
        res.json(result);
    })
})

//data amount API
//paging query limit
router.get('/dataSize', (req, res) => {
    let sql = `select count(1) as count from ftps`
    query(sql, (err, result) => {
        res.json(result)
    })
})
module.exports = router;