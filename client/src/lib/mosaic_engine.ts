export class MosaicEngine {
    imageData: ImageData;
    threshold: number;

    constructor(imageData: ImageData, threshold = 0.5) {
        this.imageData = imageData;
        this.threshold = threshold;
    }

    /** Returns a 2D grid: mosaic[row][col] is 'B' or 'F'. */
    generateMosaic(): string[][] {
        const { width, height, data } = this.imageData;
        const mosaic: string[][] = [];
        for (let row = 0; row < height; row++) {
            const mosaicRow: string[] = [];
            for (let col = 0; col < width; col++) {
                const i = (row * width + col) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const lum = this.getLuminance(r, g, b);
                mosaicRow.push(lum >= this.threshold ? 'F' : 'B');
            }
            mosaic.push(mosaicRow);
        }
        return mosaic;
    }

    private getLuminance(r: number, g: number, b: number): number {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
}