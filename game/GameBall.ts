import { GamePartner } from './GamePartner';
import { GameSessionTransaction } from './GameSessionTransaction';

export class GameBall {
    public id: number;
    public tags?: Array<GameBallTag>;

    public gameId: number;
    public gamePartnerId: number;

    public partner: GamePartner;
    public transaction: GameSessionTransaction;
}

export enum GameBallTag {
    FOOL = 'FOOL', // дурак
    MINE = 'MINE', // свояк
    LAST = 'LAST', // последний забитый шар
    CRACK = 'CRACK', // с разбоя
    FIRST = 'FIRST', // первый забитый шар
    DOUBLET = 'DOUBLET', // дуплет

    // фолы
    FOUL = 'FOUL',
    FOUL_OUT_OF_TABLE = 'OUT_OF_TABLE', // вылетел со стола
    FOUL_NO_BALL_IMPACT = 'NO_BALL_IMPACT', // не коснулся шара
    FOUL_NOT_ENOUGH_SIDE_TOUCH = 'NOT_ENOUGH_SIDE_TOUCH', // не достаточного соударения с бортами

    // цвета
    COLOR_RED = 'COLOR_RED',
    COLOR_PINK = 'COLOR_PINK',
    COLOR_BLUE = 'COLOR_BLUE',
    COLOR_BLACK = 'COLOR_BLACK',
    COLOR_GREEN = 'COLOR_GREEN',
    COLOR_BROWN = 'COLOR_BROWN',
    COLOR_WHITE = 'COLOR_WHITE',
    COLOR_YELLOW = 'COLOR_YELLOW',

    // номера
    NUMBER_ONE = 'NUMBER_ONE',
    NUMBER_TWO = 'NUMBER_TWO',
    NUMBER_THREE = 'NUMBER_THREE',
    NUMBER_FOUR = 'NUMBER_FOUR',
    NUMBER_FIVE = 'NUMBER_FIVE',
    NUMBER_SIX = 'NUMBER_SIX',
    NUMBER_SEVEN = 'NUMBER_SEVEN',
    NUMBER_EIGHT = 'NUMBER_EIGHT',
    NUMBER_NINE = 'NUMBER_NINE',
    NUMBER_TEN = 'NUMBER_TEN',
    NUMBER_ELEVEN = 'NUMBER_ELEVEN',
    NUMBER_TWELVE = 'NUMBER_TWELVE',
    NUMBER_THIRTEEN = 'NUMBER_THIRTEEN',
    NUMBER_FOURTEEN = 'NUMBER_FOURTEEN',
    NUMBER_FIFTEEN = 'NUMBER_FIFTEEN',
    NUMBER_SIXTEEN = 'NUMBER_SIXTEEN',
}