import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setYourVideo } from 'src/client/store/factory/actions';
import styles from 'src/client/styles/stylesScreen.module.sass';
import Video from '../../../assets/video.svg';

export default function YourVideo () {
    const dispatch = useDispatch();

    const openVideoDialog = () => {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = 'video/mp4';

        input.onchange = (event: any) => {
          const file = event.target.files[0];

          if(file?.size > 10000000){
            alert('File size is limited to 10MB');

            return;
          }

          if (file) {
            dispatch(setYourVideo(file));
          }
        };

        input.click();
    };

    return (
        <div className={styles.newThemeWrapper}>
            <div className={styles.icon} onClick={openVideoDialog}>
                <Video/>
                <div>Your <br></br>Video</div>
            </div>
        </div>
    )
}