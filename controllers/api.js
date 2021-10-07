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
  createReview,
  deleteReview
};

function index(req, res) {
      if (req.query.search) {
        request(rootURL + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body) {
          const index = JSON.parse(body)
          globalData = index;
          if (index[0].id!=null)
          res.render('index', {search: req.query.search, index: index, user:req.user});
          else {
                //there are two urls one for city,state and another for 'pieces'
                //this will search for pieces results if no city results are found
                request(rootURL2 + process.env.TOKEN + '/' + req.query.search + '&s=json', function(err, response, body){
                const index = JSON.parse(body)
                globalData = index;
                res.render('index', {search: req.query.search, index: index, user: req.user});
              })
          }
        });
      } else {
        res.render('index', {index: null, search: null, user: req.user});
      }
  }

async function show(req,res) {
      if (globalData == null) res.render('index', {index: null, search: null, user:req.user})
      else {
        let reviews = await Review.find({brewery:req.params.id})
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
                res.render('show', {item:toSend,img:imgData,user:req.user,reviews})
            })
        } else res.render('show', {item:toSend,img:imgData,user:req.user,reviews})
      }
  }

  async function createReview(req,res) {
      await Review.create( {
        review: req.body.review,
        googleId: req.user.id,
        userName: req.user.name,
        photos: req.user.photos,
        brewery: toSend.id
    })
      res.redirect(`/${toSend.id}`)
  }

  async function deleteReview(req,res) {
    let toDeleteId = req.url.substr(req.url.length - 24);
    await Review.findByIdAndDelete(toDeleteId)
    res.redirect(`/${toSend.id}`)
  }
  