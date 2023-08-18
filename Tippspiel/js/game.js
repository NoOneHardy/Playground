export class Game {
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
