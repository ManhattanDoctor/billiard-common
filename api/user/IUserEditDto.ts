import { ITraceable } from '@ts-core/common';
import { User, UserAccount, UserMaster, UserPreferences, UserStatus } from '../../user';

export interface IUserEditDto extends ITraceable {
    uid?: string | number;
    status?: UserStatus;
    master?: Partial<UserMaster>;
    account?: Partial<UserAccount>;
    preferences?: Partial<UserPreferences>;
}
export declare type IUserEditDtoResponse = User;
