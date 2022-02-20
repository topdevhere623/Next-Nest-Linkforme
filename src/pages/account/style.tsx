import type { MyAppContext } from 'MyModule';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'src/client/components/container';
import Factory from 'src/client/components/factory';
import Layout from 'src/client/components/layout';
import PhoneLayout from 'src/client/components/phoneLayout';
import useMediaQuery from 'src/client/hooks';
import wrapper from 'src/client/store';
import { setTheme } from 'src/client/store/factory/actions';
import { IStoreState } from 'src/client/store/reducers';
import styles from 'src/client/styles/stylesScreen.module.sass';
import YourVideo from '../../client/components/background/YourVideo';
import Theme from '../../client/static/styleSettings.svg';
import YourImage from '../../client/components/background/YourImage';
import CustomColor from '../../client/components/background/CustomColor';


const Pro = () => <span className={styles.pro}>PRO</span>;

interface DinamicObj {
  [name: string]: any;
}

interface IProps {
  pro?: boolean;
  dashed?: boolean;
  active?: boolean;
  clickHundler: () => void;
  children: any;
  nameTheme: string;
  simple?: boolean;
  inactive?: boolean;
  blank?: boolean;
}

const StyleScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const fields = useSelector((state: IStoreState) => state.factory.fields);
  const user = useSelector((state: IStoreState) => state.factory.user);
  const theme = useSelector((state: IStoreState) => state.factory.theme);
  const isMobile = useMediaQuery(930);
  const menuIsOpen = useSelector((state: IStoreState) => state.factory.menuIsOpen);
  const isBreakpointOfBag = useMediaQuery(1150);

  let showPhone = true;
  if((isBreakpointOfBag && menuIsOpen) || isMobile){
    showPhone = false;
  }
  const Item = ({
    pro,
    dashed,
    clickHundler,
    children,
    active,
    nameTheme,
    simple,
    inactive,
    blank,
  }: IProps) => {
    const proHundler = () => {
      if (!user.pro) {
        router.push('/account/pro');
        return;
      }
      clickHundler();
    };
    return (
      <div>
        {simple ? (
          <>{children}</>
        ) : (
          <div
            className={`${styles.item} ${dashed ? styles.dashed : ''} ${
              active ? styles.active : !dashed ? styles.default : ''
            } ${inactive ? styles.inactive : ''} ${blank ? styles.blank : ''}`}
            onClick={pro ? proHundler : clickHundler}
          >
            {pro && (
              <div className={styles.proWrapper}>
                <Pro />
              </div>
            )}
            <div className={styles.background}>{children}</div>
          </div>
        )}
        <div
          className={`${styles.nameTheme} ${active ? styles.active : ''} ${
            inactive ? styles.inactive : ''
          }`}
        >
          {nameTheme}
        </div>
      </div>
    );
  };
  const BlankTheme = ({ className }: { className?: string }) => (
    <div
      className={`${styles.threeButtonsWrapper} ${className ? className : ''}`}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  return (
      <Layout>
        <div className={styles.wrapper}>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }}>
              <h1>Themes</h1>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  pro
                  dashed
                  nameTheme=""
                >
                  <div className={styles.newThemeWrapper}>
                    <div className={styles.icon}>
                      <Theme width={22} height={22} fill="#000" />
                    </div>
                    <div>Create your own theme</div>
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'default',
                      }),
                    );
                  }}
                  active={theme?.selected === 'default'}
                  nameTheme="Linktree x Daniel Triendl"
                >
                  <BlankTheme />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme1',
                        custom: {
                          buttonFontColor: '#37235E',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme1'}
                  nameTheme="Theme 1"
                >
                  <BlankTheme className={styles.theme1} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme2',
                        custom: {
                          buttonFontColor: '#fff',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme2'}
                  nameTheme="Theme 2"
                >
                  <BlankTheme className={styles.theme2} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme3',
                        custom: {
                          buttonFontColor: '#fff',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme3'}
                  nameTheme="Theme 3"
                >
                  <BlankTheme className={styles.theme3} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme4',
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme4'}
                  nameTheme="Theme 4"
                >
                  <BlankTheme className={styles.theme4} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme5',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme5'}
                  nameTheme="Theme 5"
                >
                  <BlankTheme className={styles.theme5} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme6',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme6'}
                  nameTheme="Theme 6"
                >
                  <BlankTheme className={styles.theme6} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme7',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme7'}
                  nameTheme="Theme 7"
                >
                  <BlankTheme className={styles.theme7} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme8',
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme8'}
                  nameTheme="Theme 8"
                >
                  <BlankTheme className={styles.theme8} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme9',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme9'}
                  nameTheme="Theme 9"
                >
                  <BlankTheme className={styles.theme9} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme10',
                        custom: {
                          buttonFontColor: '#262626',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme10'}
                  nameTheme="Theme 10"
                >
                  <BlankTheme className={styles.theme10} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme11',
                        custom: {
                          buttonFontColor: '#262626',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme11'}
                  nameTheme="Theme 11"
                >
                  <BlankTheme className={styles.theme11} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme12',
                        custom: {
                          buttonFontColor: '#189EB9',
                          socialIconsColor: '#189EB9',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme12'}
                  nameTheme="Theme 12"
                >
                  <BlankTheme className={styles.theme12} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme13',
                        custom: {
                          buttonFontColor: '#fff',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme13'}
                  nameTheme="Theme 13"
                >
                  <BlankTheme className={styles.theme13} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme14',
                        custom: {
                          buttonFontColor: '#8E49A7',
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme14'}
                  nameTheme="Theme 14"
                >
                  <BlankTheme className={styles.theme14} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme15',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme15'}
                  nameTheme="Theme 15"
                >
                  <BlankTheme className={styles.theme15} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme16',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme16'}
                  nameTheme="Theme 16"
                >
                  <BlankTheme className={styles.theme16} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme17',
                        custom: {
                          socialIconsColor: '#878686',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme17'}
                  nameTheme="Theme 17"
                >
                  <BlankTheme className={styles.theme17} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme18',
                        custom: {
                          socialIconsColor: '#fff',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme18'}
                  nameTheme="Theme 18"
                >
                  <BlankTheme className={styles.theme18} />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        selected: 'theme19',
                        custom: {
                          socialIconsColor: '#262626',
                          buttonFontColor: '#262626',
                        },
                      }),
                    );
                  }}
                  active={theme?.selected === 'theme19'}
                  nameTheme="Theme 19"
                >
                  <BlankTheme className={styles.theme19} />
                </Item>
              </div>
            </div>
          </Container>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }}>
              <h1>
                Backgrounds
              </h1>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  dashed
                  inactive
                >
                  <YourImage/>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  dashed
                  inactive
                >
                    <YourVideo />
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'gradient.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Gradient"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/gradient.jpg" layout="fill" />
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'waves.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Waves"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/waves.jpg" layout="fill" />
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'zig-zag.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Zig Zag"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/zig-zag.jpg" layout="fill" />
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'polka.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Polka"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/polka.jpg" layout="fill" />
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'stripe.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Stripe"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/stripe.jpg" layout="fill" />
                  </div>
                </Item>
                <Item
                  clickHundler={() => {
                    dispatch(
                      setTheme({
                        custom: {
                          background: 'doodle.jpg'
                        },
                      }),
                    );
                  }}
                  nameTheme="Doodle"
                  inactive
                >
                  <div className={styles.imageWrapper}>
                    <Image src="/static/theme/doodle.jpg" layout="fill" />
                  </div>
                </Item>
              </div>
            </div>

            <CustomColor />
          </Container>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }}>
              <h1>
                Buttons <Pro />
              </h1>
              <h2>Fill</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.fill1}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.fill2}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.fill3}></div>
                </Item>
              </div>
              <h2>Outline</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.outline1}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.outline2}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.outline3}></div>
                </Item>
              </div>
              <h2>Hard Shadow</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.hardShadow1}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.hardShadow2}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.hardShadow3}></div>
                </Item>
              </div>
              <h2>Soft Shadow</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.softShadow1}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.softShadow2}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.softShadow3}></div>
                </Item>
              </div>
              <h2>Special</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.special1}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.special2}></div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme=""
                  simple
                >
                  <div className={styles.special3}></div>
                </Item>
              </div>
            </div>
          </Container>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }}>
              <h1>
                Fonts <Pro />
              </h1>
              <h2>Modern</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
              </div>
              <h2>Classic</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
              </div>
              <h2>Unique</h2>
              <div className={styles.grid}>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Roboto"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
                <Item
                  clickHundler={() => {
                    return;
                  }}
                  nameTheme="Montserrat"
                  simple
                  inactive
                >
                  <div className={styles.fontExample}>Aa</div>
                </Item>
              </div>
            </div>
          </Container>
        </div>
        {showPhone && (
          <PhoneLayout>
            <Factory
              noEdit={true}
              userName={user.login}
              avatar={user.avatar}
              fields={fields}
            />
          </PhoneLayout>
        )}
      </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: MyAppContext) => {
    const user = ctx.req.user;

    if (user?.fields?.length) {
      store.dispatch({ type: 'setFields', payload: user.fields });
    }

    if (user?.theme) {
      store.dispatch({ type: 'setTheme', payload: user.theme });
    }

    if (user?._id) {
      store.dispatch({ type: 'setLink', payload: user._id });
    }

    const userPayload: DinamicObj = { login: user.login };

    if (user?.avatar) {
      userPayload.avatar = user.avatar;
    }

    if (userPayload.login) {
      store.dispatch({ type: 'setUser', payload: userPayload });
    }

    return { props: {} };
  },
);

export default StyleScreen;
