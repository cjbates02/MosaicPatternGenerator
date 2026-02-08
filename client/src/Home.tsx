import { useState } from 'react'
import { ImageProcessor } from './lib/image_processor'
import { loadImageFromFile } from './utils'
import { MosaicEngine } from './lib/mosaic_engine'
import Row from './components/Row/Row'
import styles from './Home.module.css'

function Home() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mosaic, setMosaic] = useState<string[][]>([])
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

    const mosaicEngine = new MosaicEngine(imageData);
    const mosaic = mosaicEngine.generateMosaicChart();

    setMosaic(mosaic);
  }

  return (
    <div className={styles.page}>
      <div className={styles.upload}>
        <h2 className={styles.uploadTitle}>Upload an image to generate a mosaic chart</h2>
        <div className={styles.uploadActions}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {error && <div className={styles.error} role="alert">{error}</div>}
        <div className={styles.uploadFooterContainer}>
        {image && <p className={styles.meta}>Loaded: {image.naturalWidth}×{image.naturalHeight}</p>}
        {!image && <p className={styles.meta}>No image loaded</p>}
          <button onClick={handleGenerate} disabled={!image}>Generate Chart</button>
        </div>
      </div>
      <div className={styles.mosaicContainer} id="mosaic-container">
        {mosaic.map((row, index) => (
          <Row key={index} mosaicRow={row} />
        ))}
      </div>
    </div>
  )
}

export default Home
