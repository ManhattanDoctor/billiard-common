import { Type } from 'class-transformer';
import { User } from '../user';

export class GamePartner {
    public id: number;
    public name: string;
    public status: GamePartnerStatus;

    public user?: User;
    public isFavorite?: boolean;

    @Type(() => Date)
    public created: Date;
}

export enum GamePartnerStatus {
    ACTIVE = 'ACTIVE',
    REMOVED = 'REMOVED'
}

export const GAME_PARTNER_NAME_MIN_LENGTH = 3;
export const GAME_PARTNER_NAME_MAX_LENGTH = 128;

