import { Field, Theme } from 'src/server/users/interfaces/user.interface';
import styles from './styles.module.sass';
import themeStyles from '../themeStyles.module.sass';
import Image from 'next/image';
import { usePlatform } from 'src/client/hooks';
import { MouseEvent } from 'react';
import Lock from '../../../static/lock.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import dynamic from 'next/dynamic'
import Thumb from '../../icons/exampleIcon';
import Link from '../link';
interface IProps {
  data: Field;
  editing: boolean;
  theme: Theme;
  music?: boolean;
}

export default function Button({ data, theme, editing, music }: IProps) {
  const dispatch = useDispatch(),
    clickHundler = (e: MouseEvent) => {
      const preventDefault = () => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
      };

      if (music && data.link) {
        const url = new URL(data.link);
        if (/spotify/g.test(url.hostname)) {
          dispatch({
            type: 'openPopup',
            payload: {
              method: 'spotify',
              props: { uri: url.pathname.replace(/^.+?playlist\//g, '') },
            },
          });
          preventDefault();
          return true;
        }
        if (/music\.apple/g.test(url.hostname)) {
          dispatch({
            type: 'openPopup',
            payload: { method: 'applemusic', props: { uri: url.pathname } },
          });
          preventDefault();
          return true;
        }
        if (/music\.yandex/g.test(url.hostname)) {
          dispatch({
            type: 'openPopup',
            payload: { method: 'yandexmusic', props: { uri: url.pathname.replace(/^.+?album\//g, '') } },
          });
          preventDefault();
          return true;
        }
      }

      if (lock) {
        preventDefault();

        dispatch({
          type: 'openPopup',
          payload: {
            method: 'unlock',
            props: {
              data: data.lock,
              unlock: () => {
                setUnlock(true);
              },
            },
          },
        });

        return false;
      }

      return false;
    };

  let [unlock, setUnlock] = useState(false),
    lock = (data.lock?.code || data.lock?.birthDate) && !unlock;

  if (data.hide && !editing) return null;

  if (
    data.clock?.startActive &&
    data.clock?.start &&
    new Date() < new Date(data.clock.start)
  )
    return null;
  if (
    data.clock?.endActive &&
    data.clock?.end &&
    new Date() > new Date(data.clock.end)
  )
    return null;

  let themeClassName = themeStyles[theme?.selected]
    ? themeStyles[theme?.selected]
    : themeStyles.default;

  // const Thumb:any = dynamic(() =>
  //     data.thumb ? import('../../icons/'+data.thumb) : new Promise(() => {return null})
  // )

  const Button = ({ withClick }: { withClick?: boolean }) => (
    <button
      className={`${styles.button} ${themeClassName}  ${
        data.hide ? styles.blur : ''
      }`}
      onClick={withClick ? clickHundler : () => {}}
    >
      {data.thumbPic && !data.thumb && (
        <div className={styles.thumb}>
          {data.thumbPic && (
            <Image
              src={`${
                process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
                  ? 'http://localhost:3000'
                  : 'http://branch.linkmefor.com'
              }/file/${data.thumbPic}`}
              layout="fill"
            />
          )}
        </div>
      )}
      {!data.thumbPic && data.thumb && (
        <div className={styles.thumb}>
          {data.thumb && (
            <div style={{ transform: 'scale(.7)', marginTop: -5 }}>
              <Thumb fill={theme?.custom?.buttonFontColor ?? '#FFFFFF'} />
            </div>
          )}
        </div>
      )}
      <div className={styles.text}>{data.title || 'Button'}</div>
      {lock && (
        <div className={styles.lock}>
          <Lock
            width={18}
            height={18}
            fill={theme?.custom?.buttonFontColor ?? '#FFFFFF'}
          />
        </div>
      )}
    </button>
  );

  if (data.hide) {
    return (
      <div className={styles.blurWrapper}>
        <Button />
      </div>
    );
  }

  if (lock) {
    return <Button withClick={true} />;
  }

  if (music) {
    return (
      <Link data={data} precall={clickHundler}>
        <Button />
      </Link>
    );
  }

  return (
    <Link data={data}>
      <Button />
    </Link>
  );
}
