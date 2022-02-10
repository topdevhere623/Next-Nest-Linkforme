import styles from './style.module.sass'
import { useDispatch } from 'react-redux'
interface IProps {
    uri: string,
}

const YandexMusic = ({uri}: IProps) => {
    const dispatch = useDispatch();
    // https://music.yandex.ru/album/19787298
    return (
        <div className={styles.thumb}>
            <h1>Yandex Music</h1>
            <iframe frameBorder="0" style={{width:'100%', maxWidth:660, overflow: 'hidden', background: 'transparent'}} width="100%" height="450" src={"https://music.yandex.ru/iframe/#album/" + uri}></iframe>
        </div>
    )
}

export default YandexMusic;