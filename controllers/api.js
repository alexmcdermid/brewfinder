const request = require('request');
const rootURL = 'https://beermapping.com/webservice/loccity/';
const imgUrl = 'https://beermapping.com/webservice/locimage/'
let globalData = null;
let imgData = null;

module.exports = {
  index,
  show
};

function index(req, res) {
      if (req.query.search) {
        request(rootURL + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body) {
          const index = JSON.parse(body)
          globalData = index;
          console.log(index)
          res.render('index', {search: req.query.search, index: index});
        });
      } else {
        res.render('index', {index: null, search: null});
      }
  }

  function show(req,res) {
      if (globalData == null) res.render('index', {index: null, search: null})
      else {
        let toSend = null;
        let counter = 0;
        //this resets the imgData to null so the old location images wont be used
        imgData = null;
        globalData.forEach(function(e) {
            if (e.id == req.params.id) toSend = globalData[counter]
            counter++;
        })
        if (toSend.imagecount>0) {
            request(imgUrl + process.env.TOKEN+ '/' + toSend.id+'&s=json',function(err,response,body){
                imgData = JSON.parse(body)
                console.log(imgData)
                res.render('show', {item:toSend,img:imgData})
            })
        } else res.render('show', {item:toSend,img:imgData})
      }
  }
  