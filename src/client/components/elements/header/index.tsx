import {Field, Theme} from 'src/server/users/interfaces/user.interface'
import styles from './styles.module.sass'
import themeStyles from '../themeStyles.module.sass';

interface IProps {
    data: Field;
    editing: boolean;
    theme: Theme
}

export default function Header({data, editing, theme}:IProps ){
    if(data.hide && !editing) return null;
    let themeClassName = themeStyles[theme?.selected]
    ? themeStyles[theme?.selected]
    : themeStyles.default;

    return (
        <h1 className={`${styles.header} ${data.hide ? styles.blur : ''} ${themeClassName}`}>{data.title || 'Header'}</h1>
    )
}