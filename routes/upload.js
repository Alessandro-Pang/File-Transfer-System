const express = require('express');
const router = express.Router();
const multer = require('multer');

let upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads');
        },
        filename: function(req, file, cb) {
            let _isHR = /(请假)|(加班)|(月度汇总)|(原始记录表)|(考勤统计表)/;
            let qingjia = /(请假)/,
            	jiaban = /(加班)/,
                dingKQ = /(月度汇总)/,
                history = /(原始记录表)/,
                _kaoqin = /(考勤统计表)/;
            let changedName = ''
            if (_isHR.test(file.originalname)) {
                if (qingjia.test(file.originalname)) {
                    changedName = '请假.xls';
                    cb(null, changedName);
                } else if (dingKQ.test(file.originalname)) {
                    changedName = '月度汇总.xls';
                    cb(null, changedName);
                } else if (jiaban.test(file.originalname)) {
                    changedName = '加班.xls';
                    cb(null, changedName);
                } else if (_kaoqin.test(file.originalname)) {
                    changedName = '考勤统计表 （全公司）.xlsx';
                    cb(null, changedName);
                }else if(history.test(file.originalname)){
                	changedName = '原始记录表.xlsx';
                    cb(null, changedName);
                }
            } else {
                let changedName = file.originalname;
                cb(null, changedName);
            }
        }
    })
});

//单个文件上传
router.post('/single', upload.single('singleFile'), (req, res) => {
    console.log(req.file);
    res.json({
        code: '0000',
        type: 'single',
        originalname: req.file.originalname,
        path: req.file.path
    })
});

//多个文件上传
router.post('/multer', upload.array('multerFile'), (req, res) => {
    // console.log(req.files);
    let fileList = [];
    req.files.map((elem) => {
        fileList.push({
            originalname: elem.originalname
        })
    });
    res.json({
        code: '0000',
        type: 'multer',
        fileList: fileList
    });
});

module.exports = router;