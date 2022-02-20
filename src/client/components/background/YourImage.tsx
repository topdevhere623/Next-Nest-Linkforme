import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setYourImage } from 'src/client/store/factory/actions';
import styles from 'src/client/styles/stylesScreen.module.sass';
import Photo from '../../../assets/photo.svg';

export default function YourImage () {
    const dispatch = useDispatch();

    const imageDialog = () => {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = '.png,.gif,.jpg,.jpeg,.svg';
        // input.accept = 'image/png, image/gif, image/jpeg, image/svg';

        input.onchange = (e: any) => {
          const file = e.target.files[0];
          console.log(file);

          if(file?.size > 10000000){
            alert('File size is limited to 10MB')
            return;
          }
          if (file) {
            dispatch(setYourImage(file));
          }
          
        };
        input.click();
        
      };
    return (
        <div className={styles.newThemeWrapper}>
            <div className={styles.icon} onClick={imageDialog}>
                <Photo/>
                <div>Your <br></br>Image</div>
            </div>
        </div>
    )
}