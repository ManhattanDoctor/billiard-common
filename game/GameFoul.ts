import { GameBallBase } from './GameBallBase';

export class GameFoul extends GameBallBase {
    public type?: GameFoulType;
}

export enum GameFoulType {
    OUT_OF_TABLE = 'OUT_OF_TABLE', // вылетел со стола
    NO_BALL_IMPACT = 'NO_BALL_IMPACT', // не коснулся шара
    NOT_ENOUGH_SIDE_TOUCH = 'NOT_ENOUGH_SIDE_TOUCH', // не достаточного соударения с бортами
}

