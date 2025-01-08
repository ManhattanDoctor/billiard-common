import { User } from "../user";

export class GameSessionUserDecision {
    public id: number;
    public user: User;
    public type: GameSessionUserDecisionType;
    public value: GameSessionUserDecisionValue;
}

export enum GameSessionUserDecisionType {
    START = 'START',
    FINISH = 'FINISH',
}

export enum GameSessionUserDecisionValue {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    ABSTAINED = 'ABSTAINED',
}