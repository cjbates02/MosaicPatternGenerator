import styles from './Stitch.module.css';
import { Stitches } from '../../contants';

function getStitchContent(stitchContent: Stitches): string {
    switch (stitchContent) {
        case Stitches.DC_BOX:
            return 'X';
        case Stitches.DCS_BOX:
            return 'X';
        default:
            return ' '; 
    }
}

function getStitchClass(stitchContent: Stitches) {
    switch (stitchContent) {
        case Stitches.DC_BOX:
            return '';
        case Stitches.DCS_BOX:
            return styles.doubleCrochetStitch;
        case Stitches.SOLID_BOX:
            return styles.solidStitch;
        default:
            return ''; 
    }
}

export default function Stitch({ stitchContent }: { stitchContent: Stitches }) {
    return (
        <div className={`${styles.stitch} ${getStitchClass(stitchContent)}`}>
            <div className={styles.stitchContent}>{getStitchContent(stitchContent)}</div>
        </div>
    )
}