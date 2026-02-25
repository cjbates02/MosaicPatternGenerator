import {Stitches} from '../contants.ts';

export class MosaicEngine {
    imageData: ImageData;
    threshold: number;
    primaryColor: string;
    secondaryColor: string;

    constructor(imageData: ImageData, threshold = 0.5, primaryColor = 'RED', secondaryColor = 'BLUE') {
        this.imageData = imageData;
        this.threshold = threshold;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }

    generateMosaicChart(): string[][] {
        let mosaicChart =  this.initializeMosaicPattern();
        mosaicChart = this.addRelativeDoubleCrochetStitches(mosaicChart);
        mosaicChart = this.addRestOfDoubleCrochetStitches(mosaicChart);
        return mosaicChart;
    }

    private initializeMosaicPattern(): string[][] {
        const { width, height, data } = this.imageData;
        const mosaicChart: string[][] = [];
        let currentColor = this.primaryColor;
        for (let row = 0; row < height; row++) {
            const mosaicRow: string[] = [];
            mosaicRow.push(currentColor); // add the primary color to the start of the row
            for (let col = 0; col < width; col++) {
                const i = (row * width + col) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const lum = this.getLuminance(r, g, b);
                mosaicRow.push(lum >= this.threshold ? Stitches.BLANK_BOX : Stitches.SOLID_BOX);
            }
            mosaicRow.push(currentColor); // add the primary color to the end of the row
            mosaicChart.push(mosaicRow);
            currentColor = currentColor === this.primaryColor ? this.secondaryColor : this.primaryColor; // toggle the color for the next row
        }
        return mosaicChart;
    }

    private addRelativeDoubleCrochetStitches(mosaicChart: string[][]): string[][] {
        const { height, width } = this.imageData;
        for (let row = 3; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const currentStitch = mosaicChart[row][col];
                if (currentStitch !== Stitches.SOLID_BOX) {
                    continue
                }
                const doubleCrochetCell = mosaicChart[row - 2][col];
                if (doubleCrochetCell === Stitches.SOLID_BOX) {
                    mosaicChart[row - 2][col] = Stitches.DCS_BOX;
                } else {
                    mosaicChart[row - 2][col] = Stitches.DC_BOX;
                }
            }
        }
        return mosaicChart;
    } 

    private addRestOfDoubleCrochetStitches(mosaicChart: string[][]): string[][] {
        const { height, width } = this.imageData;
        for (let row = 0; row < height; row += 2) {
            for (let col = 0; col < width; col++) {
                const currentStitch = mosaicChart[row][col] as Stitches;
                if (row === height - 1) { // last row
                    mosaicChart[row][col] = Stitches.DC_BOX;
                } else if (row + 1 < height && this.isCurrentStitchValid(currentStitch) && this.isDoubleCrochetValid(mosaicChart[row + 1][col] as Stitches)) {
                    mosaicChart[row][col] = Stitches.DC_BOX;
                }
            }
        }
        return mosaicChart;
    }

    private isDoubleCrochetValid(stitch: Stitches): boolean {
        return stitch !== Stitches.DCS_BOX && stitch !== Stitches.DC_BOX;
    }

    private isCurrentStitchValid(stitch: Stitches): boolean {
        return stitch === Stitches.BLANK_BOX || stitch === Stitches.SC_BOX;
    }

    private getLuminance(r: number, g: number, b: number): number {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
}