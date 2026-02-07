export class ImageProcessor {
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
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
    return ctx.getImageData(0, 0, this.width, this.height);
  }

  toDataURL(): string {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(this.image, 0, 0, this.width, this.height);
    return canvas.toDataURL();
  }
}