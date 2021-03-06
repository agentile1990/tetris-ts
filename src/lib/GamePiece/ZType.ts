import GamePiece from "./GamePiece";
import { Coordinate, GamePieceType } from ".";

export default class ZType extends GamePiece {
    /**
     * Piece Map
     * 0 1
     *   2 3
     */
    constructor() {
        super(GamePieceType.Z);

        this.position = [
            { x: this.xOffset - 1, y: 0 },
            { x: this.xOffset, y: 0 },
            { x: this.xOffset, y: 1 },
            { x: this.xOffset + 1, y: 1 },
        ];

        this.nextPieceMap = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
        ];

        this.nextPieceDims = { rows: 2, cols: 3 };
    }

    /**
     * Determine the orientation of the piece to
     * peform the correct transformation
     */
    getTransform(): Array<Coordinate> {
        return this.position[0].y === this.position[1].y
            ? this._verticalTransform()
            : this._horizontalTransform();
    }

    /**
     * Make piece horizontal
     * @param xOffset
     * @param yOffset
     */
    private _horizontalTransform(
        xOffset?: number,
        yOffset?: number
    ): Array<Coordinate> {
        xOffset = xOffset ? xOffset : 0;
        yOffset = yOffset ? yOffset : 0;

        const transform: Array<Coordinate> = [
            {
                x: this.position[0].x - 1 + xOffset,
                y: this.position[0].y + 1 + yOffset,
            },
            {
                x: this.position[1].x + xOffset,
                y: this.position[1].y + yOffset,
            },
            {
                x: this.position[2].x + 1 + xOffset,
                y: this.position[2].y + 1 + yOffset,
            },
            {
                x: this.position[3].x + 2 + xOffset,
                y: this.position[3].y + yOffset,
            },
        ];

        for (let i = 0; i < transform.length; i++) {
            if (transform[i].x < 0) {
                return this._horizontalTransform(++xOffset, yOffset);
            } else if (transform[i].x >= this.cols) {
                return this._horizontalTransform(--xOffset, yOffset);
            } else if (transform[i].y < 0) {
                return this._horizontalTransform(xOffset, ++yOffset);
            } else if (transform[i].y >= this.rows) {
                return this._horizontalTransform(xOffset, --yOffset);
            }
        }

        return transform;
    }

    /**
     * Make piece vertical
     * @param yOffset
     * @param xOffset
     */
    private _verticalTransform(
        yOffset?: number,
        xOffset?: number
    ): Array<Coordinate> {
        xOffset = xOffset ? xOffset : 0;
        yOffset = yOffset ? yOffset : 0;

        const transform: Array<Coordinate> = [
            {
                x: this.position[0].x + 1 + xOffset,
                y: this.position[0].y - 1 + yOffset,
            },
            {
                x: this.position[1].x + xOffset,
                y: this.position[1].y + yOffset,
            },
            {
                x: this.position[2].x - 1 + xOffset,
                y: this.position[2].y - 1 + yOffset,
            },
            {
                x: this.position[3].x - 2 + xOffset,
                y: this.position[3].y + yOffset,
            },
        ];

        for (let i = 0; i < transform.length; i++) {
            if (transform[i].x < 0) {
                return this._verticalTransform(++xOffset, yOffset);
            } else if (transform[i].x >= this.cols) {
                return this._verticalTransform(--xOffset, yOffset);
            } else if (transform[i].y < 0) {
                return this._verticalTransform(xOffset, ++yOffset);
            } else if (transform[i].y >= this.rows) {
                return this._verticalTransform(xOffset, --yOffset);
            }
        }

        return transform;
    }
}
