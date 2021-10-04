const request = require('request');
const rootURL = 'https://beermapping.com/webservice/locquery/';

module.exports = {
  index
};

function index(req, res) {
      if (req.query.search) {
        request(rootURL + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body) {
          const index = JSON.parse(body)
          res.render('index', {search: req.query.search, index: index});
        });
      } else {
        res.render('index', {index: null, search: null});
      }
  }
  