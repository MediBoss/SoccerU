const express = require("express")
      router = express.Router()

// ENDPOINT TO GET TEAM ROSTER
router.get("/api/v1/leagues/:leagueID/teams/:teamID/players", function(req, res){
  console.log("getting a team's roster");
})

// ENPOINT TO GET A SPECIFIC PLAYER
router.get("/api/v1/leagues/:leagueID/teams/:teamID/players/:playerID", function(req, res){
  console.log("getting a specific player");
})


module.exports = router
