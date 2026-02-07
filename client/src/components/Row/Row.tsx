import Cell from "../Cell/Cell";
import styles from "./Row.module.css";

export default function Row({ mosaicRow }: { mosaicRow: string[] }) {
    const cells = mosaicRow.slice(1, -1).map((cell, index) => {
        return <Cell key={index} cellContent={cell} />
    });
    cells.unshift(<Cell key={0} cellContent={mosaicRow[0]} />);
    cells.push(<Cell key={cells.length} cellContent={mosaicRow[-1]} />);
    return (
        <div className={styles.row}>
            {cells}
        </div>
    )
}