import CSS from 'csstype';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from 'src/client/store/reducers';
import styles from './styles.module.sass';

interface IProps {
  children: ReactNode;
  style?: CSS.Properties;
  withBlur?: boolean;
}

/* 
  - Create function for checking if background is video
  - Move inline styles to separate file
  - Fix issue with loading new video
*/

export default function Background({ children, style, withBlur }: IProps) {
  const theme = useSelector((state: IStoreState) => state.factory.theme);

  console.log('Background theme !', theme);

  return (
    <div
      className={`${styles.background} ${styles[theme.selected]} ${
        withBlur ? styles.withBlur : ''
      }`}
      style={
        theme.custom?.background && !theme.custom?.background.endsWith('.mp4')
          ? {
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
                  ? 'http://localhost:3000'
                  : 'http://link-for-me.herokuapp.com'
              }/file/${theme.custom?.background})`,
            }
          : {}
      }
    >
      { theme.custom?.background && theme.custom?.background.endsWith('.mp4') ? 
              <video key={theme.custom?.background} autoPlay={true} loop={true} muted style={{ width: '100%', height: '100%', position: 'absolute', objectFit: 'cover', zIndex: 0 }}>
                <source src={ process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? 'http://localhost:3000' : `http://link-for-me.herokuapp.com/file/${theme.custom?.background}`} />
              </video>

          : ''
      }

      <div className={styles.innderWrapper}>
        <div className={styles.backgroundInner}>{children}</div>
      </div>
    </div>
  );
}
