import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tooltip from 'rc-tooltip';
import { useState } from 'react';
import Headroom from 'react-headroom';
import { useSelector } from 'react-redux';
import useMediaQuery, { copyTextToClipboard } from 'src/client/hooks';
import { IStoreState } from 'src/client/store/reducers';
import styles from './styles.module.sass';

interface IProps {
  menuIsOpen: boolean;
  setMenuOpen: (arg0: boolean) => void;
}

interface IPropsMenu {
  menuIsOpen: boolean;
}

const Menu = ({ menuIsOpen }: IPropsMenu) => {
  const router = useRouter();

  const isAccount = router.pathname == '/account',
    isSettings = router.pathname == '/account/settings',
    isProScreen = router.pathname == '/account/pro';

  return (
    <ul className={`${styles.menu} ${!menuIsOpen ? styles.menuIsClose : ''}`}>
      <Link href="/account">
        <li className={isAccount ? styles.active : ''}>My account</li>
      </Link>
      <Link href="/account/settings">
        <li className={isSettings ? styles.active : ''}>Settings</li>
      </Link>
      {isProScreen && (
        <Link href="/account/pro">
          <li className={styles.active}>PRO</li>
        </Link>
      )}
    </ul>
  );
};

export default function Header({ menuIsOpen = true, setMenuOpen }: IProps) {
  const menuHandler = () => setMenuOpen(!menuIsOpen);
  const link = useSelector((state: IStoreState) => state.factory.link);
  let myLink: string = 'https://link/' + link;
  const isMobile = useMediaQuery(500);
  const [shareTooltip, setShareTooltip] = useState(false);

  const shareHandler = () => {
    setShareTooltip(true);

    setTimeout(() => {
      setShareTooltip(false);
      copyTextToClipboard(
        `${
          process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
            ? 'http://localhost:3000'
            : 'http://link-for-me-test.herokuapp.com'
        }/${link}`,
      );
    }, 1000);
  };

  return (
    <Headroom style={{zIndex: 12}}>
      <header className={styles.header}>
        <div
          className={`${styles.burger} ${!menuIsOpen ? styles.close : ''}`}
          onClick={menuHandler}
        >
          <Image src="/static/menu.svg" layout="fill" />
        </div>
        {/* <Link href="/"> */}
          <div className={styles.logo} onClick={()=>{location?.reload()}}>
            <a>Linkforme</a>
          </div>
        {/* </Link> */}
        {!isMobile && <Menu menuIsOpen={menuIsOpen} />}
        <div className={styles.myLink}>
          {!isMobile && (
            <>
              My link:{' '}
              <a href={`/${link}`} target="_blank">
                <span>{myLink}</span>
              </a>
            </>
          )}
        </div>
        <Tooltip
          placement="bottom"
          trigger="focus"
          visible={shareTooltip}
          overlay={() => <span>Copied to clipboard!</span>}
        >
          <button onClick={shareHandler}>Share</button>
        </Tooltip>
        {isMobile && <Menu menuIsOpen={menuIsOpen} />}
      </header>
    </Headroom>
  );
}
