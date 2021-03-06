const express = require("express")
      cors = require("cors")
      router = express.Router()
      League = require("../../../models/league")
      User = require("../../../models/user")
      helper = require("../../../helpers/validator")

// ENDPOINT TO ALL LEAGUES AVAILABLE
router.get("/api/v1/leagues", cors(), function(req, res){

  const key = req.apiKey
  if(helper.isValideAPIKey(key)){

      League.find({})
        .then( (leagues) => {
        res.json(leagues)
      }).catch( error => {
      res.status(400).json({ error: error })
    })
  } else {
    res.status(401).json({ err: "Invalid Token"})
  }
})


// ENPOINT TO GET A SPECIFIC LEAGUE
router.get("/api/v1/leagues/:leagueID", cors(), function(req, res){

  const key = req.apiKey
  if(helper.isValideAPIKey(key)){

    League.findById(req.params.leagueID)
    .then( (league) => {
      res.json(league)
    }).catch( error => {
      res.status(400).json({ error: error })
    })
  }else {
    res.status(401).send("Aunthenticated Request")
  }
})


module.exports = router
