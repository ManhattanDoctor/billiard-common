import { Type } from 'class-transformer';
import { GameBall } from './GameBall';
import { GamePartner } from './GamePartner';
import { GamePartnerResult } from './GamePartnerResult';

export class Game {
    public id: number;
    public status: GameStatus;
    public gameSessionId: number;

    public balls: Array<GameBall>;

    // нужно для подсчета очков в колхозе и смены очередности игроков в рамках сессии
    public partners: Array<GamePartner>;
    public results?: Array<GamePartnerResult>;
    public multiplier?: string;
}

export enum GameStatus {
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
    IN_PROGRESS = 'IN_PROGRESS',
    REMOVED = 'REMOVED'
}
