import styles from './style.module.sass'
import { useDispatch } from 'react-redux'
interface IProps {
    uri: string,
}

const AppleMusic = ({uri}: IProps) => {
    const dispatch = useDispatch();
    // https://music.apple.com/ru/album/a-lot-of-money-single/1594920455
    return (
        <div className={styles.thumb}>
            <h1>Apple Music</h1>
            <iframe allow="autoplay *; encrypted-media *; fullscreen *" frameBorder="0" height="450" style={{width:'100%', maxWidth:660, overflow: 'hidden', background: 'transparent'}} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src={"https://embed.music.apple.com/s"+uri}></iframe>
        </div>
    )
}

export default AppleMusic;