import { CoinId } from "../coin";
import { GamePartner } from "./GamePartner";

export class GamePartnerResult {
    public id: number;
    public score: GamePartnerResultScore;
    public partner: GamePartner;
    public balance?: GamePartnerResultScore;
}

export class GamePartnerResultScore {
    score: number;
    amount: string;
    coinId: CoinId;
}
