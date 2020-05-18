const express = require('express');
const app = express();
const songRoute = express.Router();

let songModel = require('../model/song');

//Add song
songRoute.route('/create-song').post((req, res, next) => {
    songModel.create(req.body, (error, data) => {
        if(error){
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//getAll songs
songRoute.route('/').get((req, res) => {
    songModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single song
songRoute.route('/get-song/:id').get((req, res) => {
    songModel.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  
  // Update song
  songRoute.route('/update-song/:id').put((req, res, next) => {
    songModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Song successfully updated!')
      }
    })
  })
  
  // Delete song
  songRoute.route('/delete-song/:id').delete((req, res, next) => {
    songModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log('erreur suppression !');
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  
  module.exports = songRoute;
  