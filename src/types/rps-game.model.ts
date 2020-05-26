import { User } from "./user.model";
import { RpsHand } from "./rps.model";

export class RpsGame {
    private _isStarted: boolean = false;
    private player1: User;
    private player1Hand: RpsHand;
    private player1won: boolean;

    private player2: User;
    private player2Hand: RpsHand;
    private player2won: boolean;

    constructor() {}

    public start(user: User, hand: RpsHand) {
        this.player1 = user;
        this.player1Hand = hand;
        this._isStarted = true;
    }

    public end(user: User, hand: RpsHand) {
        this.player2 = user;
        this.player2Hand = hand;

        let result = this.calcResult();
        this.reset();

        return result;
    }

    public isStarted() {
        return this._isStarted;
    }

    private calcResult() {
        let hand1 = this.decodeRpsHand(this.player1Hand);
        let hand2 = this.decodeRpsHand(this.player2Hand);
        let distance = (hand2 - hand1 + 3) % 3;

        let winner;

        if (distance == 0) {
            this.player2won = false;
            this.player1won = false;
        } else if (distance == 1) {
            this.player1won = true;
            this.player2won = false;
        } else if (distance == 2) {
            this.player2won = true;
            this.player1won = false;
        }

        return {
            player1: {
                id: this.player1.id,
                name: this.player1.name,
                hand: this.player1Hand,
                won: this.player1won,
            },
            player2: {
                id: this.player2.id,
                name: this.player2.name,
                hand: this.player2Hand,
                won: this.player2won,
            },
        };
    }

    private decodeRpsHand(hand: RpsHand) {
        if (hand == RpsHand.ROCK) {
            return 0;
        } else if (hand === RpsHand.SCISSORS) {
            return 1;
        } else if (hand === RpsHand.PAPER) {
            return 2;
        } else {
            throw new Error(`Unrecognized hand: ${hand}`);
        }
    }

    private reset() {
        this._isStarted = false;
        this.player1 = null;
        this.player1Hand = null;
        this.player2 = null;
        this.player2Hand = null;
    }
}
