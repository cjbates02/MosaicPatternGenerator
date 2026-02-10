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
        mosaicChart = this.addDoubleCrochetStitches(mosaicChart);
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

    private addDoubleCrochetStitches(mosaicChart: string[][]): string[][] {
        const { height, width } = this.imageData;
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                if (row >= height - 3) {
                    continue;
                }
                const currentStitch = mosaicChart[row][col];
                if (currentStitch === Stitches.SOLID_BOX) {
                    mosaicChart[row - 3][col] = Stitches.DCS;
                }
            }
        }
        return mosaicChart;
    }

    private getLuminance(r: number, g: number, b: number): number {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
}