import { CoinId } from '../../coin';
import { ITraceable } from '@ts-core/common';

export interface ICoinBalanceEditDto extends ITraceable {
    coinId: CoinId;
    amount: string;
    userId: number;
}

