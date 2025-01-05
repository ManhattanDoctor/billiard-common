import { Type } from 'class-transformer';
import { UserAccount } from './UserAccount';
import { UserStatistics } from './UserStatistics';
import { UserPreferences } from './UserPreferences';

export class User {
    public id: number;
    public login: string;
    public status: UserStatus;
    public resource: UserResource;
    public lastLogin: Date;

    @Type(() => Date)
    public created: Date;

    @Type(() => UserAccount)
    public account: UserAccount;

    @Type(() => UserPreferences)
    public preferences: UserPreferences;

    @Type(() => UserStatistics)
    public statistics?: UserStatistics;
}

export enum UserResource {
    VK = 'VK',
    MAIL = 'MAIL',
    YANDEX = 'YANDEX',
    GOOGLE = 'GOOGLE',
    TELEGRAM = 'TELEGRAM',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}

