const { json } = require('body-parser');
const { Schema } = require('mongoose');
const request = require('request');
const Review = require('../models/reviews');
const rootURL = 'https://beermapping.com/webservice/loccity/'
const rootURL2 = 'http://beermapping.com/webservice/locquery/'
const imgUrl = 'https://beermapping.com/webservice/locimage/'
let globalData = null;
let imgData = null;
let toSend = null;
let counter = 0;

module.exports = {
  index,
  show,
  createReview
};

function index(req, res) {
    console.log('we made it to index')
      if (req.query.search) {
        request(rootURL + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body) {
          const index = JSON.parse(body)
          globalData = index;
          console.log(index)
          if (index[0].id!=null)
          res.render('index', {search: req.query.search, index: index, user:req.query.user});
          else {
                //there are two urls one for city,state and another for 'pieces'
                //this will search for pieces results if no city results are found
                request(rootURL2 + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body){
                const index = JSON.parse(body)
                globalData = index;
                console.log(index)
                res.render('index', {search: req.query.search, index: index, user: req.query.user});
              })
          }
        });
      } else {
        res.render('index', {index: null, search: null, user: req.query.user});
      }
  }

  function show(req,res) {
      console.log('were in show')
      if (globalData == null) res.render('index', {index: null, search: null, user:req.query.user})
      else {
        toSend = null;
        counter = 0;
        //this resets the imgData to null so the old location images wont be used
        imgData = null;
        globalData.forEach(function(e) {
            if (e.id == req.params.id) toSend = globalData[counter]
            counter++;
        })
        if (toSend.imagecount>0 && toSend.imagecount!=null) {
            request(imgUrl + process.env.TOKEN+ '/' + toSend.id+'&s=json',function(err,response,body){
                imgData = JSON.parse(body)
                res.render('show', {item:toSend,img:imgData,user:req.query.user})
            })
        } else res.render('show', {item:toSend,img:imgData,user:req.query.user})
      }
  }

  async function createReview(req,res) {
      let obj = {
          review: req.body.review,
          googleID: 1,
          brewery: toSend.id
      }
      await Review.create(obj)
      res.redirect(`/${toSend.id}`)
  }
  