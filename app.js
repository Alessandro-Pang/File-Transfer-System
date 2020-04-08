let express = require('express');
let fs = require('fs');
var bodyParser = require('body-parser');
let app = express();
//通过express.static访问静态文件
app.use(express.static("./"));

app.get("/", function(request, response) {
    fs.readFile("./views/index.html" + request.path.substr(1), function(err, data) {
        // body
        if (err) {
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404, { "Content-Type": "text/html" });
        } else {
            //200：OK
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data.toString());
        }
        response.end();
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//引入路由
const multerUpload = require('./routes/upload');
const query = require('./db/db.config');

//使用路由
app.use('/upload', multerUpload);
app.use('/db', query)

app.listen(3000, function() {
    console.log("server start: http://localhost:3000/");
});