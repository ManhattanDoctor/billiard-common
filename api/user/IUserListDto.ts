import { IPaginable, IPagination } from '@ts-core/common';
import { ITraceable } from '@ts-core/common';
import { User, UserPreferences, UserStatistics } from '../../user';

export interface IUserListDto extends IPaginable<User, Partial<UserPreferences & UserStatistics>>, ITraceable { }

export interface IUserListDtoResponse extends IPagination<User> { }
