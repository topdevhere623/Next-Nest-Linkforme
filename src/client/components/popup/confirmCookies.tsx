import styles from './style.module.sass'
import { useDispatch } from 'react-redux'
import { setCookie } from 'src/shared/utils/fetch'

const Spotify = () => {
    const dispatch = useDispatch();
    const closePopup = () => {
        dispatch({type: 'openPopup', payload: {method: ''}});
    }

    const clickHundlerAllow = () => {
        setCookie("cookies_confirmed", "1", 99);
        closePopup();
    }

    const clickHundlerDecline = () => {
        setCookie("cookies_confirmed", "2", 99);
        closePopup();
    }

    return (
        <div className={`${styles.confirmCookies} ${styles.lock}`}>
            <h1>We are you using cookies, we need your permissions</h1>
            <button onClick={clickHundlerAllow}>Allow</button>
            <button className={styles.declineButton} onClick={clickHundlerDecline}>Decline</button>
        </div>
    )
}

export default Spotify;