import { IPaginable, IPagination, IFilterableProperties, ITraceable } from '@ts-core/common';
import { User, UserAccount, UserPreferences, UserStatistics } from '../../user';

export interface IUserListDto extends IPaginable<User, UserPreferences>, ITraceable {
    account?: IFilterableProperties<UserAccount>;
    statistics?: IFilterableProperties<UserStatistics>;
    preferences?: IFilterableProperties<UserPreferences>;
}

export interface IUserListDtoResponse extends IPagination<User> { }
