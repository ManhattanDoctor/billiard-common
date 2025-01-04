import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { User } from '../../user';
import { CoinAccount } from '../../coin';

export interface IManagementCoinAccountListDto extends IPaginable<CoinAccount, Partial<User>>, ITraceable { }

export interface IManagementCoinAccountListDtoResponse extends IPagination<CoinAccount> { }
