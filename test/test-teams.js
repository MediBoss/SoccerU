const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const should = chai.should()
const assert = chai.assert
const Team = require("../models/team")
const League = require("../models/league")


chai.use(chaiHttp)

// SET UP
const dummyTeam = {
  players: [],
  name: "Barcelona",
  stadium: "Camp Nou",
  location: "Spain",
  coach: "Some Guy"
}

const dummyLeague = {
  teams: [],
  name: "EPL",
  numberOfTeams: 20,
  location: "England, UK"
}

describe('Teams', () => {

  before( () => {
    // Any set up before starting test
  })

  // Delete data from Database after testing
  after(() => {
    League.deleteMany({ name: "EPL"}).exec( (error, leagues) => {
      //leagues.remove()
    })
    Team.deleteMany({ name: "Barcelona"}).exec( (error, teams) => {
      //teams.remove()
    })
  })

  // TEST ROUTE : GET ALL TEAMS FROM A LEAGUE
  it('should return all the teams from the DB on /api/v1/leagues/:leagueID/teams GET', (done) => {
    let league = new League(dummyLeague)
    league.save(( err, savedLeague) => {
      chai.request(server)
        .get(`/api/v1/leagues/${savedLeague._id}/teams`)
        .end( (err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  // TEST ROUTE : GET A SINGLE TEAM
  it('should return one team from the DB on /api/v1/leagues/:leagueID/teams/:teamID GET', (done) => {

    const league = new League(dummyLeague)

    league.save( (err, savedLeague) => {

      const team = new Team(dummyTeam)
      team.save( (err, savedTeam) => {
        chai.request(server)
        .get(`/api/v1/leagues/${savedLeague._id}/teams/${savedTeam._id}`)
        .end( (err, res) => {
  
          // Test Assertions and Assumptions
          res.should.have.status(200)
          res.body.should.have.property('name')
          res.body.should.have.property('coach')
          res.body.should.have.property('location')
          assert.typeOf(res.body.stadium, 'string')
          assert.typeOf(res.body.name, 'string')
          done()
        })
      })
    })
  })
})
