import { Type } from 'class-transformer';
import { CoinId } from '../coin';
import { GamePartner } from './GamePartner';

export class GameSessionTransaction {
    id: number;
    type: GameSessionTransactionType;
    status: GameSessionTransactionStatus;
    sessionId: number;

    @Type(() => GamePartner)
    debet: GamePartner;

    @Type(() => GamePartner)
    credit: GamePartner;

    score?: string;
    amount?: string;
    coinId?: CoinId;

    gameId?: number;
    ballId?: number;

    @Type(() => Date)
    created: Date;
}

export enum GameSessionTransactionStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}

export enum GameSessionTransactionType {
    GAME_SESSION_STARTED,
    GAME_SESSION_FINISHED,
    GAME_STARTED,
    GAME_FINISHED,
    GAME_BALL,
}