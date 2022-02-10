import CSS from 'csstype';
import Image from 'next/image';
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

  console.log('Background theme !', theme);
  return (
    <div
      className={`${styles.background} ${styles[theme.selected]} ${
        withBlur ? styles.withBlur : ''
      }`}
      style={
        theme.custom?.background
          ? {
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
                  ? 'http://localhost:3000'
                  : 'http://branch.linkmefor.com'
              }/file/${theme.custom?.background})`,
            }
          : {}
      }
    >
      <div className={styles.innderWrapper}>
        <div className={styles.backgroundInner}>{children}</div>
      </div>
    </div>
  );
}
