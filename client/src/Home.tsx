import { useState } from 'react'
import { ImageProcessor } from './lib/image_processor'
import { loadImageFromFile } from './utils'
import { MosaicEngine } from './lib/mosaic_engine'

function Home() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const stitchWidth = 50

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    try {
      const img = await loadImageFromFile(file)
      setImage(img)
    } catch {
      setError('Failed to load image')
    }
  }

  function handleGenerate() {
    if (!image) return
    const processor = new ImageProcessor(image, stitchWidth)
    const imageData = processor.getImageData()
    console.log(imageData);
    console.log('Pixel grid:', imageData.width, 'x', imageData.height, imageData.data.length / 4, 'pixels');
    const mosaicEngine = new MosaicEngine(imageData);
    const mosaic = mosaicEngine.generateMosaic();
    console.log(mosaic);
  }

  return (
    <>
      <div>Upload an image to generate a mosaic chart</div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div role="alert">{error}</div>}
      {image && <p>Loaded: {image.naturalWidth}×{image.naturalHeight}</p>}
      <button onClick={handleGenerate} disabled={!image}>Generate Chart</button>
    </>
  )
}

export default Home
