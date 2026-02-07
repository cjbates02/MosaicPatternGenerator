export class MosaicEngine {
    imageData: ImageData;

    constructor(imageData: ImageData) {
        this.imageData = imageData;
    }

    generateMosaic() {
        const mosaic: string[] = [];
        for (let i = 0; i < this.imageData.data.length; i += 4) {
            const r = this.imageData.data[i];
            const g = this.imageData.data[i + 1];
            const b = this.imageData.data[i + 2];
            const a = this.imageData.data[i + 3];
            mosaic.push(this.getLuminance(r, g, b).toString());
        }
        return mosaic;
    }

    private getLuminance(r: number, g: number, b: number) {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
}