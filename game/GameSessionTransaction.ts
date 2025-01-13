import { Type } from 'class-transformer';
import { CoinId } from '../coin';
import { GamePartner } from './GamePartner';
import { Game } from './Game';
import { GameSession } from './GameSession';

export class GameSessionTransaction {
    id: number;
    type: GameSessionTransactionType;
    status: GameSessionTransactionStatus;

    game?: Game;
    ball?: Game;
    debit: GamePartner;
    credit: GamePartner;
    session?: GameSession;

    score?: number;
    amount?: string;
    coinId?: CoinId;

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