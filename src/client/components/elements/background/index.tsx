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

export default function Background({ children, style, withBlur }: IProps) {
  const theme = useSelector((state: IStoreState) => state.factory.theme);

  const isVideo = () => {
    return theme.custom?.background?.endsWith('.mp4');
  };

  const isPattern = (background: string) => {
    return ['doodle', 'gradient', 'polka', 'stripe', 'waves', 'zig-zag'].includes(background.split('.')[0]);
  };

  console.log('Background theme !', theme);

  return (
    <div
      className={`${styles.background} ${styles[theme.selected]} ${
        withBlur ? styles.withBlur : ''
      }`}
      style={
        theme.custom?.background && !isVideo()
          ? {
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
                  ? 'http://localhost:3000'
                  : 'http://link-for-me.herokuapp.com'
              }${isPattern(theme.custom.background) ? `/static/theme/${theme.custom.background}` : `/file/${theme.custom.background})`}`,
            }
          : {
            backgroundColor: theme.custom?.backgroundColor || '#fff'
          }
      }
    >
      { theme.custom?.background && isVideo() ? 
              <video className={styles.video} key={theme.custom?.background} autoPlay={true} loop={true} muted>
                <source src={ process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? 'http://localhost:3000' : `http://link-for-me-test.herokuapp.com/file/${theme.custom?.background}`} />
              </video>

          : ''
      }

      <div className={styles.innderWrapper}>
        <div className={styles.backgroundInner}>{children}</div>
      </div>
    </div>
  );
}
