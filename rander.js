
let fangfa=require('./fangfa');


module.exports = function rander(req,res) {
  if (req.url.startsWith('/index') || req.url == '/') {
   fangfa.showIndex(req,res);
  } else if (req.url.startsWith('/detail')) {
    fangfa.showDetail(req,res);
 

  } else if (req.url.startsWith('/submit')) {
    fangfa.showSub(req,res);
  
    // res.end('dsad')
  } else if (req.url.startsWith('/add') && req.method == 'GET') {
    fangfa.addGet(req,res);
   
    //  info.parse()
  
  } else if (req.url.startsWith('/add') && req.method == 'POST') {
 
    fangfa.addPost(req,res);

  } else if (req.url.startsWith('/new')) {
    fangfa.showCss(req,res);

  } else {
    fangfa.showEnd(req,res);
   
  }
}








