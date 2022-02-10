import {ReactNode} from 'react'
import styles from './styles.module.sass'
import CSS from 'csstype'

interface IProps {
    children: ReactNode,
    style?: CSS.Properties
}

export default function Container ({children, style}: IProps){
    return (
        <div className={styles.container} style={style ?? {}}>
            <div className={styles.inner}>
                {children}
            </div>
        </div>
    )
}