import { Type } from 'class-transformer';
import { User } from '../user';

export class GamePartner {
    public id: number;
    public name: string;
    public status: GamePartnerStatus;
    public picture: string;

    @Type(() => User)
    public user?: User;

    @Type(() => Date)
    public created: Date;
}

export enum GamePartnerStatus {
    ACTIVE = 'ACTIVE',
    HIDDEN = 'HIDDEN'
}

