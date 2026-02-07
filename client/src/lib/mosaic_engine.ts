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

    generateMosaic(): string[][] {
        const { width, height, data } = this.imageData;
        const mosaic: string[][] = [];
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
                mosaicRow.push(lum >= this.threshold ? 'F' : 'B');
            }
            mosaicRow.push(currentColor); // add the primary color to the end of the row
            mosaic.push(mosaicRow);
            currentColor = currentColor === this.primaryColor ? this.secondaryColor : this.primaryColor; // toggle the color for the next row
        }
        return mosaic;
    }

    private getLuminance(r: number, g: number, b: number): number {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
}