import type { Stitches } from "../../contants";
import Stitch from "../Stitch/Stitch";
import styles from "./Row.module.css";


export default function Row({ mosaicRow }: { mosaicRow: Stitches[] }) {
    const cells = mosaicRow.slice(1, -1).map((stitch, index) => {
        return <Stitch key={index} stitchContent={stitch} />
    });
    return (
        <div className={styles.row}>
            <Stitch stitchContent={mosaicRow[0]}/>
            <div className={styles.bodyRows}>
                {cells}
            </div>
            <Stitch stitchContent={mosaicRow[mosaicRow.length - 1]}/>
        </div>
    )
}