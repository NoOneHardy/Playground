class Game {
    aTeamId;
    bTeamId;
    aTeamGoals;
    bTeamGoals;

    constructor(aTeamId, bTeamId, aTeamGoals, bTeamGoals) {
        this.aTeamId = aTeamId;
        this.bTeamId = bTeamId;
        this.aTeamGoals = aTeamGoals;
        this.bTeamGoals = bTeamGoals;
    }
}

class Team {
    id;
    name;
    points = 0;
    gameCount = 0;
    wins = 0;
    ties = 0;
    losses = 0;
    goals = 0;
    oGoals = 0;
    goalDif = 0;
    games = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    addGoals(goals) {
        this.goals += goals;
    }

    addOGoals(oGoals) {
        this.oGoals += oGoals;
    }

    refreshGoalDif() {
        this.goalDif = this.goals - this.oGoals;
    }

    addWin() {
        this.wins++;
        this.points = this.points + 3;
    }

    addLoss() {
        this.losses++;
    }

    addTie() {
        this.ties++;
        this.points++;
    }

    increaseGameCount() {
        this.gameCount++;
    }
}

function compareTeams(groupInput) {
    const teamsWithSameValues = [];
    const group = groupInput.sort(function (teamA, teamB) {
        if (teamA.points !== teamB.points) {
            return teamB.points - teamA.points;
        } else if (teamA.goalDif !== teamB.goalDif) {
            return teamB.goalDif - teamA.goalDif;
        } else if (teamA.goals !== teamB.goals) {
            return teamB.goals - teamA.goals;
        } else {
            if (!teamsWithSameValues.includes(teamA)) {
                teamsWithSameValues.push(teamA);
            }
            if (!teamsWithSameValues.includes(teamB)) {
                teamsWithSameValues.push(teamB);
            }
            return 0;
        }
    });

    if (teamsWithSameValues.length === 3) {
        const newGroup = compare3Teams(teamsWithSameValues);

        const indexes = [];
        newGroup.map((team) => { indexes.push(group.indexOf(team)); });
        const minIndex = indexes.sort((indexA, indexB) => {
            return indexB - indexA;
        })[0]

        group.splice(minIndex, 3);
        newGroup.forEach((team, idx) => {
            group.splice(minIndex + idx, 0, team);
        });
    }

    return group;
}

function compare3Teams(teams) {
    return teams.sort((teamA, teamB) => {
        let headToHead = new Game(-1, -1, 0, 0);
        teamA.games.map((game) => {
            if (game.aTeamId === teamB.id) {
                headToHead = new Game(teamA.id, teamB.id, game.bTeamGoals, game.aTeamGoals);
            } else if (game.bTeamId === teamB.id) {
                headToHead = game;
            }
        })
        return headToHead.bTeamGoals - headToHead.aTeamGoals;
    });
}

const team1 = new Team(0, 'Serbien');
const team2 = new Team(1, 'Brasilien');
const team3 = new Team(2, 'Schweiz');
const team4 = new Team(3, 'Kamerun');

const groupArray = [team1, team2, team3, team4];

const games = [];
games.push(new Game(2, 3, 1, 0));
games.push(new Game(3, 0, 3, 3));
games.push(new Game(3, 1, 1, 0));
games.push(new Game(1, 2, 1, 0));
games.push(new Game(0, 2, 2, 3));
games.push(new Game(0, 1, 0, 2));

function calculatePoints(game) {
    groupArray.forEach((team) => {
        if (team.id === game.aTeamId) {
            team.games.push(game);
            team.addGoals(game.aTeamGoals);
            team.addOGoals(game.bTeamGoals);
            team.increaseGameCount();
            team.refreshGoalDif();
            if (game.aTeamGoals > game.bTeamGoals) {
                team.addWin();
            } else if (game.aTeamGoals < game.bTeamGoals) {
                team.addLoss();
            } else {
                team.addTie();
            }
        } else if (team.id === game.bTeamId) {
            team.games.push(game);
            team.addGoals(game.bTeamGoals);
            team.addOGoals(game.aTeamGoals);
            team.increaseGameCount();
            team.refreshGoalDif();
            if (game.bTeamGoals > game.aTeamGoals) {
                team.addWin();
            } else if (game.bTeamGoals < game.aTeamGoals) {
                team.addLoss();
            } else {
                team.addTie();
            }
        }
    })

}

function refreshTable() {
    games.map(calculatePoints);
    compareTeams(groupArray).map(team => console.log(team));
}
refreshTable();
