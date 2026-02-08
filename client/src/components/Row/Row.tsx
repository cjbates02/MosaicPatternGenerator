import Cell from "../Cell/Cell";
import styles from "./Row.module.css";

export default function Row({ mosaicRow }: { mosaicRow: string[] }) {
    const cells = mosaicRow.slice(1, -1).map((cell, index) => {
        return <Cell key={index} cellContent={cell} />
    });
    return (
        <div className={styles.row}>
            <Cell cellContent={mosaicRow[0]}/>
            <div className={styles.bodyRows}>
                {cells}
            </div>
            <Cell cellContent={mosaicRow[mosaicRow.length - 1]}/>
        </div>
    )
}