import { ITraceable, IFilterable } from '@ts-core/common';
import { User, UserMaster } from '../../user';

export interface IUserMasterListDto extends IFilterable<User, UserMaster>, ITraceable { }

export interface IUserMasterListDtoResponse extends Array<User> { }
