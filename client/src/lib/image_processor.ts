export class ImageProcessor {
  // returns image data in the form of [r,g,b,a, r,g,b,a, ...] per pixel, row-major.
  image: HTMLImageElement;
  width: number;

  constructor(image: HTMLImageElement, width: number) {
    this.image = image;
    this.width = width;
  }

  get height(): number {
    return Math.round((this.width * this.image.height) / this.image.width);
  }

  getImageData(): ImageData {
    const { ctx } = this.getCanvas();
    return ctx.getImageData(0, 0, this.width, this.height);
  }

  toDataURL(): string {
    const { canvas } = this.getCanvas();
    return canvas.toDataURL();
  }

  private getCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
    return { canvas, ctx };
  }
}