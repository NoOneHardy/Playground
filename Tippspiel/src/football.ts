import { Game } from "./game.js";
import { Team } from "./team.js";

/* EM-Tabellenregelen
--------------- Punkte 

--------------- Wenn zwei Teams dieselbe Anzahl Punkte haben, wird die Tordifferenz der Direktbegegnung der beiden Teams gewertet.

--------------- Wenn zwei Teams in der Direktbegegnung dieselbe Tordifferenz und dieselbe Anzahl Punkte haben,
                werden die Tordifferenzen der beiden Teams in der ganzen Gruppe ausgewertet.

--------------- Danach die Tore der beiden Teams aus der ganzen Gruppe.

Wenn drei Teams dieselbe Anzahl Punkte haben, wird die Tordifferenz der Direktbegnungen der drei Teams geweretet.

Wenn drei Teams dieselbe Anzahl Punkte und dieselbe Tordifferenz in den Direktbegnungen der drei Teams haben,
werden die Tore der drei Teams in den Direktbegegnungen ausgewertet.

Danach die Tordifferenz der drei aus der ganzen Gruppe.

Danach die Tore der drei aus der gesamten Gruppe.

Danach muss manuell verschoben werden.
*/


function compareETeams(groupInput: Team[]): Team[] {
    const teamsWithSamePoints: Team[] = [];
    const group = groupInput.sort(function (teamA, teamB) {
        if (teamB.points !== teamA.points) {
            return teamB.points - teamA.points;
        }
        if (!teamsWithSamePoints.includes(teamA)) {
            teamsWithSamePoints.push(teamA);
        }

        if (!teamsWithSamePoints.includes(teamB)) {
            teamsWithSamePoints.push(teamB);
        }
        return 0
    });

    if (teamsWithSamePoints.length !== 0) {
        const indexes: number[] = [];
        teamsWithSamePoints.forEach((team) => {
            indexes.push(group.indexOf(team));
        });
        const minIndex = indexes.sort((idxTeamA, idxTeamB) => idxTeamA - idxTeamB)[0];

        switch (teamsWithSamePoints.length) {
            case 2:
                teamsWithSamePoints.sort((teamA, teamB) => {
                    let headToHead = new Game(-1, -1, 0, 0);
                    teamA.games.forEach((game) => {
                        if (game.aTeamId === teamB.id || game.bTeamId === teamB.id) {
                            headToHead = game;
                        }
                    });

                    if (headToHead.bTeamGoals !== headToHead.aTeamGoals) {
                        return headToHead.bTeamGoals - headToHead.aTeamGoals;
                    }
                    if (teamB.goalDif !== teamA.goalDif) {
                        return teamB.goalDif - teamA.goalDif;
                    }
                    if (teamB.goals !== teamA.goals) {
                        return teamB.goals - teamA.goals;
                    }
                    return 0;
                });
                group.splice(minIndex, 2, teamsWithSamePoints[0], teamsWithSamePoints[1]);
                break;
            case 3:
                const games3Teams: Game[] = [];
                const group3Teams: Team[] = [];

                teamsWithSamePoints.forEach((team) => {
                    group3Teams.push(new Team(team.id, team.name));
                    team.games.forEach((game) => {
                        // Prüfen, ob das Gegnerteam des Spiels im teamsWithSamePoints vorhanden ist und ob das Team noch nicht in der neuen Gruppe vorhanden ist.
                        if (-1 < teamsWithSamePoints.findIndex((teamB) => teamB.id !== team.id && (teamB.id === game.aTeamId || teamB.id === game.bTeamId)) && !games3Teams.includes(game)) {
                            games3Teams.push(game);
                        }
                    });
                });

                games3Teams.forEach((game) => calculatePoints(game, group3Teams));

                group3Teams.sort((teamA, teamB) => {
                    if (teamB.goalDif !== teamA.goalDif) {
                        return teamB.goalDif - teamA.goalDif;
                    }
                    if (teamB.goals !== teamA.goals) {
                        return teamB.goals - teamA.goals;
                    }
                    return 0
                });

                teamsWithSamePoints.sort((teamA, teamB) => {
                    return group3Teams.findIndex((team) => teamA.id === team.id) - group3Teams.findIndex((team) => teamB.id === team.id);
                });

                let itemsSorted = 3;
                const unsortedItems: Team[] = [];
                group3Teams.forEach((team) => {
                    if (group3Teams.findIndex((teamB) => team.id !== teamB.id && teamB.goalDif === team.goalDif && teamB.goals === team.goals) > -1) {
                        itemsSorted--;
                        if (!unsortedItems.includes(team)) {
                            unsortedItems.push(team)
                        }
                    }
                });

                if (itemsSorted < 1) {
                    teamsWithSamePoints.sort((teamA, teamB) => {
                        if (teamB.goalDif !== teamA.goalDif) {
                            return teamB.goalDif - teamA.goalDif
                        }
                        if (teamB.goals !== teamA.goals) {
                            return teamB.goals - teamA.goals;
                        }
                        return 0;
                    });
                } else if (itemsSorted == 1) {
                    const indexes2: number[] = [];
                    unsortedItems.forEach((team) => {
                        indexes2.push(group.indexOf(team));
                    });
                    const minIndex2 = indexes2.sort((idxTeamA, idxTeamB) => idxTeamA - idxTeamB)[0];
                    unsortedItems.sort((teamA, teamB) => {
                        let headToHead = new Game(-1, -1, 0, 0);
                        teamA.games.map((game) => {
                            if (game.aTeamId === teamB.id || game.bTeamId === teamB.id) {
                                headToHead = game;
                            }
                        });
    
                        if (headToHead.bTeamGoals !== headToHead.aTeamGoals) {
                            return headToHead.bTeamGoals - headToHead.aTeamGoals;
                        }
                        if (teamB.goalDif !== teamA.goalDif) {
                            return teamB.goalDif - teamA.goalDif;
                        }
                        if (teamB.goals !== teamA.goals) {
                            return teamB.goals - teamA.goals;
                        }
                        return 0;
                    });
                    teamsWithSamePoints.splice(minIndex2, 2, teamsWithSamePoints[0], teamsWithSamePoints[1]);
                }

                group.splice(minIndex, 3, teamsWithSamePoints[0], teamsWithSamePoints[1], teamsWithSamePoints[2]);
                break;
            case 4:
                break;
        }
    }

    return group;
}

function calculatePoints(game: Game, group: Team[]): void {
    group.forEach((team) => {
        if (team.games.length < group.length - 1) {
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
        games.map((game) => {
            calculatePoints(game, groupArray);
        });
        compareETeams(groupArray).map((team, idx, teams) => {
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
                nameDisplays[4].innerHTML = teamName;
                nameDisplays[9].innerHTML = teamName;
                break;
            case 1:
                nameDisplays[1].innerHTML = teamName;
                nameDisplays[6].innerHTML = teamName;
                nameDisplays[10].innerHTML = teamName;
                break;
            case 2:
                nameDisplays[2].innerHTML = teamName;
                nameDisplays[5].innerHTML = teamName;
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


const games: Game[] = [];
/*
games.push(new Game(0, 1, 1, 0));
games.push(new Game(2, 3, 2, 1));
games.push(new Game(2, 0, 3, 0));
games.push(new Game(1, 3, 1, 0));
games.push(new Game(3, 0, 4, 1));
games.push(new Game(1, 2, 0, 2));
*/
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
    games[2] = new Game(0, 2, Number(gameInputs[4].value), Number(gameInputs[5].value));
    games[3] = new Game(1, 3, Number(gameInputs[6].value), Number(gameInputs[7].value));
    games[4] = new Game(3, 0, Number(gameInputs[8].value), Number(gameInputs[9].value));
    games[5] = new Game(1, 2, Number(gameInputs[10].value), Number(gameInputs[11].value));

    refreshTable();
})