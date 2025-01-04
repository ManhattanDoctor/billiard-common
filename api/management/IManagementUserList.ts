import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { User, UserPreferences } from '../../user';

export interface IManagementUserListDto extends IPaginable<User, UserPreferences>, ITraceable { }

export interface IManagementUserListDtoResponse extends IPagination<User> { }
