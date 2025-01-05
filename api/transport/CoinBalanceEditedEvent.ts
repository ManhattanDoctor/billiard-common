import { TransportEvent } from "@ts-core/common";

export class CoinBalanceEditedEvent extends TransportEvent<any>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinBalanceEditedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: any) {
        super(CoinBalanceEditedEvent.NAME, data);
    }
}
