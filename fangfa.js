//这里就是主要的方法
//进行路由选择
let url = require('url');
let template = require('art-template');
let mime = require('mime');
let queryString = require('querystring');
let fs = require('fs');
let path = require('path');

module.exports = {

  showIndex(req,res) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf-8', (err, data) => {
      if (err) { return console.log(err) }
      data = JSON.parse(data);
      data.list.sort((a, b) => b.id - a.id);
      // console.log(__dirname)
      let str = template(path.join(__dirname, 'view', 'index.html'), data);
      // console.log(str);
      res.end(str);
    })
  },
  showDetail(req,res) {
    read(function callback(data) {
      let str = JSON.parse(data).list;
      let id = url.parse(req.url, true).query.id;
      let newid = str.find(v => v.id == id);
      res.end(template(path.join(__dirname, 'view', 'detail.html'), newid));
    })
  },
  addGet(req,res) {

    //bhbjnmkl;'
    
    let info = url.parse(req.url, true).query;
    //  info.parse()
    read(function callback(data) {
      let str = JSON.parse(data).list;
      info.id = str[str.length - 1].id + 1;
      str.push(info);
      //进行自动把json的内进行格式化
      str = { list: str };
      str = JSON.stringify(str, null, 2);
      console.log(str);
      fs.writeFile(path.join(__dirname, 'data', 'data.json'), str, err => { if (err) { console.log(err) } });

      res.statusCode = 302;
      res.setHeader('location', '/index.html');
      res.end();
    })
  },
  showSub(req,res) {
    fs.readFile(path.join(__dirname, 'view', 'submit.html'), 'utf-8', (err, data) => {
      if (err) { return console.log(err) };
      res.end(data);


    })
  },
  addPost(req,res) {
    let info = '';
    req.on('data', (chunk) => {
      info += chunk;
    })

    req.on('end', () => {
      info = queryString.parse(info);
    })
    read(function callback(data) {
      let str = JSON.parse(data).list;
      info.id = str[str.length - 1].id + 1;
      str.push(info);
      //进行自动把json的内进行格式化
      str = { list: str };
      str = JSON.stringify(str, null, 2);
      console.log(str);
      fs.writeFile(path.join(__dirname, 'data', 'data.json'), str, err => { if (err) { console.log(err) } });

      res.statusCode = 302;
      res.setHeader('location', '/index.html');
      res.end();
    })
  },
  showCss(req,res) {
    fs.readFile(path.join(__dirname, 'view', 'new.css'), (err, data) => {
      if (err) { return console.log(err) }
      res.setHeader('content-type', mime.getType(req.url));
      res.end(data);
    })
  },
  showEnd(req,res) {
    res.end('');
  }


}


function read(callback) {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) { return console.log(err) }
    callback && callback(data);
  })
}