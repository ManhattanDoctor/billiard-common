import { Type } from 'class-transformer';
import { CoinId, ICoinAmount } from '../coin';
import { PaymentAccountId } from './Payment';

export class PaymentTransaction implements ICoinAmount {
    id: number;
    type: PaymentTransactionType;
    debet: PaymentAccountId;
    credit: PaymentAccountId;
    amount: string;
    coinId: CoinId;
    userId: number;

    itemId?: number;
    itemType?: PaymentTransactionItemType;

    @Type(() => Date)
    created: Date;

    paymentId?: number;

    @Type(() => Date)
    activated?: Date;
}

export enum PaymentTransactionItemType {

}

export enum PaymentTransactionType {
    REFUND = 'REFUND',
    PURCHASE = 'PURCHASE',
    CORRECTION = 'CORRECTION'
}