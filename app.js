
let http = require('http');
let server = http.createServer();

let  rander=require('./rander');
server.on('request', (req, res) => {
rander(req,res);
});
server.listen(9999, () => {
  console.log('http://localhost:9999/index.html' + '嗯哼成功了')
});