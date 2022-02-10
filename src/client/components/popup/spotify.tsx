import styles from './style.module.sass'
import { useDispatch } from 'react-redux'
interface IProps {
    uri: string,
}

const Spotify = ({uri}: IProps) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.thumb}>
            <h1>Spotify</h1>
            <iframe src={`https://open.spotify.com/embed/playlist/${uri}`} width="100%" height="480" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
        </div>
    )
}

export default Spotify;