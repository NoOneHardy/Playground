export class Game {
    readonly aTeamId: number;
    readonly bTeamId: number;
    readonly aTeamGoals: number;
    readonly bTeamGoals: number;

    constructor(aTeamId: number, bTeamId: number, aTeamGoals: number, bTeamGoals: number) {
        this.aTeamId = aTeamId;
        this.bTeamId = bTeamId;
        this.aTeamGoals = aTeamGoals;
        this.bTeamGoals = bTeamGoals;
    }
}