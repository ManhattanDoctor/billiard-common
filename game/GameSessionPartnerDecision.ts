import { GamePartner } from "./GamePartner";

export class GameSessionPartnerDecision {
    public id: number;
    public type: GameSessionUserDecisionType;
    public value: GameSessionUserDecisionValue;
    public partner: GamePartner;
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