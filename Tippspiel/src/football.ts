import { Game } from "./game.js";
import { Team } from "./team.js";

function compareTeams(groupInput: Team[]): Team[] {
    const teamsWithSameValues: Team[] = [];
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

    if (teamsWithSameValues.length === 3 || teamsWithSameValues.length === 2) {
        const newGroup = compare2or3or4Teams(teamsWithSameValues);

        const indexes: number[] = [];
        newGroup.map((team) => { indexes.push(group.indexOf(team)); });
        const minIndex = indexes.sort((indexA, indexB) => {
            return indexA - indexB;
        })[0];

        group.splice(minIndex, teamsWithSameValues.length);
        newGroup.forEach((team, idx) => {
            group.splice(minIndex + idx, 0, team);
        });
    } else if (teamsWithSameValues.length === 4) {
        const sameValues: Team[][] = [[], []];
        teamsWithSameValues.map((team) => {
            if (teamsWithSameValues[0].points === team.points) {
                sameValues[0].push(team);
            } else if (teamsWithSameValues[0].points !== team.points) {
                sameValues[1].push(team);
            }
        })

        if (sameValues[0].length === 4) {
            group.splice(0, 4);
            compare2or3or4Teams(sameValues[0]).map(team => group.push(team));
        } else {
            if (group.indexOf(sameValues[0][0]) > 2) {
                group.splice(0, 4);
                compare2or3or4Teams(sameValues[1]).map(team => group.push(team));
                compare2or3or4Teams(sameValues[0]).map(team => group.push(team));
            } else {
                group.splice(0, 4);
                compare2or3or4Teams(sameValues[0]).map(team => group.push(team));
                compare2or3or4Teams(sameValues[1]).map(team => group.push(team));
            }
        }
    }

    return group;
}

function compare2or3or4Teams(teams: Team[]): Team[] {
    return teams.sort((teamA, teamB) => {
        let headToHead = new Game(-1, -1, 0, 0);
        teamA.games.map((game) => {
            if (game.aTeamId === teamB.id) {
                headToHead = new Game(teamA.id, teamB.id, game.bTeamGoals, game.aTeamGoals);
            } else if (game.bTeamId === teamB.id) {
                headToHead = game;
            }
        })
        if (headToHead.bTeamGoals !== headToHead.aTeamGoals) {
            return headToHead.bTeamGoals - headToHead.aTeamGoals;
        } else if (teamA.fairplay) {
            return -1
        } else if (teamB.fairplay) {
            return 1
        } else {
            return 0
        }
    });
}

function calculatePoints(game: Game): void {
    groupArray.forEach((team) => {
        if (team.gameCount < 3) {
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
        }
    })
}

function refreshTable() {
    if (table) {
        table.innerHTML = '';
        games.map(calculatePoints);
        compareTeams(groupArray).map((team, idx, teams) => {
            const row = document.createElement('tr');
            row.classList.add('table-row');
            const tds: HTMLTableCellElement[] = [];
            for (let i = 0; i < 9; i++) {
                tds.push(document.createElement('td'));
            }
            tds[0].innerHTML = teams.indexOf(team) + 1 + ' ' + team.name;
            tds[1].innerHTML = team.gameCount.toString();
            tds[2].innerHTML = team.wins.toString();
            tds[3].innerHTML = team.ties.toString();
            tds[4].innerHTML = team.losses.toString();
            tds[5].innerHTML = team.goals.toString();
            tds[6].innerHTML = team.oGoals.toString();
            tds[7].innerHTML = team.goalDif.toString();
            tds[8].innerHTML = team.points.toString();
            tds.map((td) => {
                row.appendChild(td);
            })
            table.appendChild(row);
        });
    }
}

const table = document.getElementById('table');

const nameInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.team-name-input');
const gameInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('.game-score');
const nameDisplays: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.team-name');
const calcButton: HTMLElement | null = document.getElementById('confirm-games');


const groupArray: Team[] = [];
groupArray[0] = new Team(0, 'Team 1');
groupArray[1] = new Team(1, 'Team 2');
groupArray[2] = new Team(2, 'Team 3');
groupArray[3] = new Team(3, 'Team 4');

nameInputs.forEach((nameInput, idx) => {
    nameInput.addEventListener('input', () => {
        let teamName = nameInput.value;
        if (/^\s+$/.test(teamName) || teamName === '') {
            teamName = 'Team ' + (idx + 1);
        }
        groupArray[idx] = new Team(idx, teamName.trim());
        switch (idx) {
            case 0:
                nameDisplays[0].innerHTML = teamName;
                nameDisplays[5].innerHTML = teamName;
                nameDisplays[9].innerHTML = teamName;
                break;
            case 1:
                nameDisplays[1].innerHTML = teamName;
                nameDisplays[6].innerHTML = teamName;
                nameDisplays[10].innerHTML = teamName;
                break;
            case 2:
                nameDisplays[2].innerHTML = teamName;
                nameDisplays[4].innerHTML = teamName;
                nameDisplays[11].innerHTML = teamName;
                break;
            case 3:
                nameDisplays[3].innerHTML = teamName;
                nameDisplays[7].innerHTML = teamName;
                nameDisplays[8].innerHTML = teamName;
                break;
        }
    })
});

/*
games.push(new Game(0, 1, 3, 0));
games.push(new Game(2, 3, 2, 1));
games.push(new Game(2, 0, 2, 5));
games.push(new Game(1, 3, 1, 2));
games.push(new Game(3, 0, 0, 0));
games.push(new Game(1, 2, 0, 3));
*/

const games: Game[] = [];

gameInputs.forEach((gameInput, idx) => {
    gameInput.addEventListener('blur', () => {
        if (gameInput.value.match('\s') || gameInput.value === '') {
            gameInput.value = '0'
        }
    })
})

calcButton?.addEventListener('click', () => {
    nameInputs.forEach((nameInput, idx) => {
        let teamName = nameInput.value;
        if (/^\s+$/.test(teamName) || teamName === '') {
            teamName = 'Team ' + (idx + 1);
        }
        groupArray[idx] = new Team(idx, teamName);
        //groupArray[2].fairplay = true;
    });

    games[0] = new Game(0, 1, Number(gameInputs[0].value), Number(gameInputs[1].value));
    games[1] = new Game(2, 3, Number(gameInputs[2].value), Number(gameInputs[3].value));
    games[2] = new Game(2, 0, Number(gameInputs[4].value), Number(gameInputs[5].value));
    games[3] = new Game(1, 3, Number(gameInputs[6].value), Number(gameInputs[7].value));
    games[4] = new Game(3, 0, Number(gameInputs[8].value), Number(gameInputs[9].value));
    games[5] = new Game(1, 2, Number(gameInputs[10].value), Number(gameInputs[11].value));

    refreshTable();
})