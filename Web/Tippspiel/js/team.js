export class Team {
    id;
    name;
    _points = 0;
    _gameCount = 0;
    _wins = 0;
    _ties = 0;
    _losses = 0;
    _goals = 0;
    _oGoals = 0;
    _goalDif = 0;
    _games = [];
    _manual = 0;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addGoals(goals) {
        this._goals += goals;
    }
    addOGoals(oGoals) {
        this._oGoals += oGoals;
    }
    refreshGoalDif() {
        this._goalDif = this.goals - this.oGoals;
    }
    addWin() {
        this._wins++;
        this._points = this.points + 3;
    }
    addLoss() {
        this._losses++;
    }
    addTie() {
        this._ties++;
        this._points++;
    }
    increaseGameCount() {
        this._gameCount++;
    }
    get points() {
        return this._points;
    }
    get gameCount() {
        return this._gameCount;
    }
    get wins() {
        return this._wins;
    }
    get ties() {
        return this._ties;
    }
    get losses() {
        return this._losses;
    }
    get goals() {
        return this._goals;
    }
    get oGoals() {
        return this._oGoals;
    }
    get goalDif() {
        return this._goalDif;
    }
    get games() {
        return this._games;
    }
    get manual() {
        return this._manual;
    }
    set manual(rank) {
        this._manual = rank;
    }
}
