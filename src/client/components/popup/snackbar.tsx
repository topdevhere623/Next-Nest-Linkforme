import styles from './style.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../../store/reducers';
import { closeSnackbar } from '../../store/factory/actions';

export type Type = 'success';

export default function Snackbar() {
    const snackbar = useSelector((state: IStoreState) => state.factory.snackbar);
    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(closeSnackbar());
    };

    return (
        <div className={styles.snackbarContainer} style={snackbar?.isVisible ? {} : { display: 'none' }}>
            <div className={`${styles.innerContainer} ${styles[snackbar.type || 'success']}`}>
                <div className={styles.icon}>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path></svg>
                </div>

                <span className={styles.message}>{snackbar?.message || ''}</span>

                <div className={styles.close}>
                    <button onClick={handleClose}>
                        <span className={styles.iconContainer}>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}