let fs = require('fs');
let path = require('path');
let http = require('http');
let server = http.createServer();
let url = require('url');
let template = require('art-template');
let mime = require('mime');
let queryString = require('querystring');

server.on('request', (req, res) => {
  if (req.url.startsWith('/index') || req.url == '/') {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf-8', (err, data) => {
      if (err) { return console.log(err) }
      data = JSON.parse(data);
      data.list.sort((a, b) => b.id - a.id);
      // console.log(__dirname)
      let str = template(path.join(__dirname, 'view', 'index.html'), data);
      // console.log(str);
      res.end(str);
    })
  } else if (req.url.startsWith('/detail')) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) { return console.log(err) }
      let str = JSON.parse(data).list;
      let id = url.parse(req.url, true).query.id;

      let newid = str.find(v => v.id == id);
      console.log(newid)
      res.end(template(path.join(__dirname, 'view', 'detail.html'), newid));
    })

  } else if (req.url.startsWith('/submit')) {
    fs.readFile(path.join(__dirname, 'view', 'submit.html'), 'utf-8', (err, data) => {
      if (err) { return console.log(err) };
      res.end(data);


    })
    // res.end('dsad')
  } else if (req.url.startsWith('/add') && req.method == 'GET') {
    let info = url.parse(req.url, true).query;
    //  info.parse()
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) { return console.log(err) }
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

  } else if (req.url.startsWith('/add') && req.method == 'POST') {
    let info = '';
    req.on('data', (chunk) => {
      info += chunk;
    })

    req.on('end', () => {
      info = queryString.parse(info);
    })
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) { return console.log(err) }
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

  } else {
    res.end('');
  }

  
});
server.listen(9999, () => {
  console.log('http://localhost:9999/index.html' + '嗯哼成功了')
});