import styles from './style.module.sass'
import Image from 'next/image'
import UploadSvg from '../../static/upload.svg'
import { useDispatch } from 'react-redux'
import {setThumbPic} from 'src/client/store/factory/actions'
interface IProps {
    fieldId: string,
    singleEdit: boolean
}

const Thumb = ({fieldId, singleEdit}: IProps) => {
    const dispatch = useDispatch();

    const imageDialog = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/gif, image/jpeg"

        input.onchange = (e: any) => {
            var file = e.target.files[0];

            if(file?.size > 1000000){
                alert('File size is limited to 1MB')
                return;
            }

            if(file) {
                dispatch(setThumbPic(file, fieldId, singleEdit))
                dispatch({type: 'openPopup', payload: {method: ''}})
            }
        }

        input.click();
    }

    return (
        <div className={styles.thumb}>
            <h1>Add Thumbnail</h1>
            <div className={styles.row}>
                <div className={styles.optionIcon}>
                    <UploadSvg fill="#fff" />
                </div>
                <div className={styles.column}>
                    <div className={`${styles.headline} ${styles.purple}`} onClick={() => imageDialog()}>
                        Upload Your Own Thumbnail
                    </div>
                    <div className={styles.description}>
                        From your computer, Facebook, Instagram or Google Drive
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.optionIcon} ${styles.gray}`}>
                    <Image src="/static/iconSet.png" layout="fill" />
                </div>
                <div className={styles.column}>
                    <div className={styles.headline} onClick={()=> dispatch({type: 'openPopup', payload: {method: 'thumbSet', props: {fieldId, singleEdit}}}) }>
                        Choose from Our Set
                    </div>
                    <div className={styles.description}>
                        From our Linkforme Set
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thumb;