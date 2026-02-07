import styles from './Cell.module.css';

export default function Cell({ cellContent }: { cellContent: string }) {
    return (
        <div className={styles.cell}>
            <div className={styles.cellContent}>{cellContent}</div>
        </div>
    )
}