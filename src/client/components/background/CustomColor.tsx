import * as React from 'react';
import styles from './styles.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundColor } from 'src/client/store/factory/actions';
import { IStoreState } from '../../store/reducers';

export default function CustomColor () {
    const theme = useSelector((state: IStoreState) => state.factory.theme);
    const dispatch = useDispatch();

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if(value) {
            dispatch(setBackgroundColor(value))
        }
    };

    return (
        <div className={styles.customColorContainer}>
            <input type="color" onChange={handleColorChange} value={theme.custom?.backgroundColor || '#ffffff'} />
            
            <span>
                Background
            </span>
        </div>
    )
}

