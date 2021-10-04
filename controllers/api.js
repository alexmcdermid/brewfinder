const request = require('request');
const rootURL = 'https://beermapping.com/webservice/locquery/';
let globalData = null;

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
        globalData.forEach(function(e) {
            if (e.id == req.params.id) toSend = globalData[counter]
            counter++;
        })
        res.render('show', {item:toSend})
      }
  }
  