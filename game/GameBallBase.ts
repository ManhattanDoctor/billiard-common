import { Type } from 'class-transformer';
import { GamePartner } from './GamePartner';

export class GameBallBase {
    public id: number;
    public tags?: Array<GameBallTag>;
    public score?: string;
    
    @Type(() => GamePartner)
    public author: GamePartner;

    @Type(() => Date)
    public created: Date;
}

export enum GameBallTag {
    FOOL = 'FOOL', // дурак
    MINE = 'MINE', // свояк
    LAST = 'LAST', // последний забитый шар
    CRUSH = 'CRUSH', // с разбоя
    FIRST = 'FIRST', // первый забитый шар

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