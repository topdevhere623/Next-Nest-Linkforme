import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tooltip from 'rc-tooltip';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from 'src/client/hooks';
import { addField } from 'src/client/store/factory/actions';
import AddHeader from '../../static/addHeader.svg';
import AddLink from '../../static/addLink.svg';
import AddMusic from '../../static/addMusic.svg';
import Analytics from '../../static/analitycs.svg';
import Buttons from '../../static/buttons.svg';
import Close from '../../static/close.svg';
import StyleSettings from '../../static/styleSettings.svg';
import styles from './styles.module.sass';


interface IPropsButton {
  text: string;
  Icon?: ({ fill }: { fill: string }) => ReactElement;
  onClick?: () => void;
  full?: boolean;
  isOpen?: boolean;
  active?: boolean;
}
interface ICompProps {
  isOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export const Button = ({
  text,
  Icon,
  onClick,
  full,
  isOpen = true,
  active,
}: IPropsButton) => {
  let [hover, setHover] = useState(false);
  let iconColor = hover ? '#9D5C82' : '#000';

  if (full) {
    iconColor = hover || active ? '#fff' : '#9D5C82';
  }
  return (
    <Tooltip
      placement="right"
      trigger="hover"
      overlayStyle={isOpen ? { display: 'none' } : {}}
      overlay={() => <span>{text}</span>}
    >
      <div
        data-el="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={
          onClick
            ? onClick
            : () => {
                return;
              }
        }
        className={`${styles.button} ${full ? styles.buttonFull : ''} ${
          active ? styles.active : ''
        }`}
      >
        {Icon && (
          <div className={styles.iconWrapper}>
            <Icon fill={iconColor} />
          </div>
        )}
        <div className={styles.textWrapper}>{text}</div>
      </div>
    </Tooltip>
  );
};

export default function SiteBar({ isOpen = true, setMenuOpen }: ICompProps) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(500);
  const router = useRouter();
  const [isButtonsScreen, setB] = useState(
    router.pathname === '/account/buttons',
  );
  const [route, setRoute] = useState(router.route);
  const addButton = () =>
    dispatch(addField({ type: 'link', title: '', link: '' }));
  const addHeader = () => dispatch(addField({ type: 'header', title: '' }));
  const addMusic = () => dispatch(addField({ type: 'music', title: 'Music' }));
  const closeSitebarOnMobile = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleStart = (url: any) => {
      //   if(/\/account/g.test(url)){
      //     setRoute(url);
      //   }
      setRoute(url);
    };

    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [router]);

  return (
    <div
      className={`${styles.sitebarWrapper}  ${!isOpen ? styles.close : ''} ${
        typeof window === 'undefined' ? styles.hideMobile : ''
      } sitebarGlobal`}
    >
      <div
        className={`${styles.sitebar} ${!isOpen ? styles.close : ''} ${
          typeof window === 'undefined' ? styles.defaultClose : ''
        }`}
      >
        {isMobile && (
          <div className={styles.headMobile}>
            <div className={styles.headline}>Menu</div>
            <div className={styles.close} onClick={() => setMenuOpen(false)}>
              <Close width={20} height={20} fill="#000" />
            </div>
          </div>
        )}
        <div className={styles.top}>
          {/* <AnimatePresence initial={false} exitBeforeEnter={true}> */}
          {isButtonsScreen && (
            <motion.div
              initial={route === '/account/buttons' ? 'hidden' : 'visible'}
              animate="visible"
              transition={{ duration: 0.5 }}
              variants={{
                visible: { opacity: 1, maxHeight: 1000 },
                hidden: { opacity: 0, maxHeight: 0 },
              }}
              style={{ overflow: 'hidden' }}
              exit="hidden"
              layoutId="sitebarConstructorControlls"
              // layout
              key={route}
              //   onAnimationComplete={(definition) => {
              //     console.log('Completed animating', definition);
              //   }}
            >
              <Button
                onClick={() => {
                  if (!isButtonsScreen) {
                    router.push('/account/buttons').then(() => {
                      addButton();
                      closeSitebarOnMobile();
                    });
                  } else {
                    addButton();
                    closeSitebarOnMobile();
                  }
                }}
                text="Add Link"
                Icon={({ fill }) => (
                  <AddLink width={20} height={20} fill={fill} />
                )}
                isOpen={isOpen}
              />
              <Button
                onClick={() => {
                  if (!isButtonsScreen) {
                    router.push('/account/buttons').then(() => {
                      addHeader();
                      closeSitebarOnMobile();
                    });
                  } else {
                    addHeader();
                    closeSitebarOnMobile();
                  }
                }}
                text="Add Header"
                Icon={({ fill }) => (
                  <AddHeader width={20} height={20} fill={fill} />
                )}
                isOpen={isOpen}
              />
              <Button
                onClick={() => {
                  if (!isButtonsScreen) {
                    router.push('/account/buttons').then(() => {
                      addMusic();
                      closeSitebarOnMobile();
                    });
                  } else {
                    addMusic();
                    closeSitebarOnMobile();
                  }
                }}
                text="Add Music Link"
                Icon={({ fill }) => (
                  <AddMusic width={20} height={22} fill={fill} />
                )}
                isOpen={isOpen}
              />
              {/* <Button
                                onClick={()=> {
                                    // dispatch(addField({type: 'link', title: 'Button'}))
                                }}
                                text="Add Payment Link"
                                Icon={({fill})=>(<AddPayment width={20} height={20} fill={fill} />)}
                                isOpen={isOpen}
                            /> */}
              <div className={styles.space}></div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
          <Button
            full={true}
            text="Style Settings"
            onClick={() => {
              router.push('/account/style').then(() => {
                closeSitebarOnMobile();
              });
            }}
            Icon={({ fill }) => (
              <StyleSettings width={22} height={22} fill={fill} />
            )}
            isOpen={isOpen}
            active={router.pathname == '/account/style'}
          />
          <Button
            full={true}
            text="Analytics"
            onClick={() => {
              router.push('/account/analytics').then(() => {
                closeSitebarOnMobile();
              });
            }}
            Icon={({ fill }) => (
              <Analytics width={20} height={20} fill={fill} />
            )}
            isOpen={isOpen}
            active={router.pathname == '/account/analytics'}
          />
          <Button
            full={true}
            text="Buttons"
            onClick={() => {
              router.push('/account/buttons').then(() => {
                closeSitebarOnMobile();
              });
            }}
            Icon={({ fill }) => <Buttons width={20} height={20} fill={fill} />}
            isOpen={isOpen}
            active={router.pathname == '/account/buttons'}
          />
        </div>
        <div className={styles.bottom}>
          <Link href="/faq">
            <div className={styles.faq}>
              <Image src="/static/questions.svg" layout="fill" />
            </div>
          </Link>
          <Link href="/blog">
            <div className={styles.blog}>
              <Image src="/static/blog.svg" layout="fill" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
