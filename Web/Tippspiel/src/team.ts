import { Game } from "./game.js";

export class Team {
    readonly id: number;
    readonly name: string;
    private _points = 0;
    private _gameCount = 0;
    private _wins = 0;
    private _ties = 0;
    private _losses = 0;
    private _goals = 0;
    private _oGoals = 0;
    private _goalDif = 0;
    private _games: Game[] = [];
    private _manual = 0;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public addGoals(goals: number) {
        this._goals += goals;
    }

    public addOGoals(oGoals: number) {
        this._oGoals += oGoals;
    }

    public refreshGoalDif() {
        this._goalDif = this.goals - this.oGoals;
    }

    public addWin() {
        this._wins++;
        this._points = this.points + 3;
    }

    public addLoss() {
        this._losses++;
    }

    public addTie() {
        this._ties++;
        this._points++;
    }

    public increaseGameCount() {
        this._gameCount++;
    }

    public get points(): number {
        return this._points;
    }

    public get gameCount(): number {
        return this._gameCount;
    }

    public get wins(): number {
        return this._wins;
    }

    public get ties(): number {
        return this._ties;
    }

    public get losses(): number {
        return this._losses;
    }

    public get goals(): number {
        return this._goals;
    }

    public get oGoals(): number {
        return this._oGoals;
    }

    public get goalDif(): number {
        return this._goalDif;
    }

    public get games(): Game[] {
        return this._games;
    }

    public get manual(): number {
        return this._manual;
    }

    public set manual(rank: number) {
        this._manual = rank;
    }
}