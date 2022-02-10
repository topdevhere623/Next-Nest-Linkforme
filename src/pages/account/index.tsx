import Layout from 'src/client/components/layout';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { IStoreState } from 'src/client/store/reducers';
import wrapper from 'src/client/store';
import { updateUser, deleteUser } from 'src/client/store/factory/actions';
import styles from '../../client/styles/account.module.sass';
import Factory from 'src/client/components/factory';
import PhoneLayout from 'src/client/components/phoneLayout';
import Container from 'src/client/components/container';
import { Button } from 'src/client/components/sitebar';

import Delete from '../../client/static/delete.svg';
import Links from '../../client/static/links.svg';
import StyleSettings from '../../client/static/styleSettings.svg';
import Settings from '../../client/static/settings.svg';

import type { MyAppContext } from 'MyModule';
import { useState } from 'react';
import useMediaQuery from 'src/client/hooks';
import { useRouter } from 'next/router';

const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fields = useSelector((state: IStoreState) => state.factory.fields);
  const user = useSelector((state: IStoreState) => state.factory.user);
  const isMobile = useMediaQuery(960);
  const [userName, setUserName] = useState(user.login),
    [mail, setMail] = useState(user.email);
  const updateUserHundler = () => {
    const updatePayload: any = {};

    if (mail !== user.email) {
      updatePayload.email = mail;
    }

    if (userName !== user.login) {
      updatePayload.login = userName;
    }

    dispatch(updateUser(updatePayload));
  };
  const menuIsOpen = useSelector((state: IStoreState) => state.factory.menuIsOpen);
  const isBreakpointOfBag = useMediaQuery(1150);

  let showPhone = true;
  if((isBreakpointOfBag && menuIsOpen) || isMobile){
    showPhone = false;
  }
  return (
      <Layout>
        <div className={styles.wrapper}>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }} className={styles.myInformation}>
              <h1>My information</h1>
              <div className={styles.row}>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="text"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <Button
                onClick={() => updateUserHundler()}
                text="Save Changes"
                full
              />
            </div>
          </Container>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }} className={styles.currentAccount}>
              <h1>Current account</h1>
              <div className={styles.row} data-el="owners">
                <div className={styles.column}>
                  <div className={styles.headline}>Name</div>
                  <div className={styles.value}>@{user.login}</div>
                </div>
                <div className={styles.column}>
                  <div className={styles.headline}>Plan</div>
                  <div className={styles.value}>
                    {user.pro ? 'Pro' : 'Free'}
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.headline}>Admins</div>
                  <div className={styles.value}>@{user.login} (owner)</div>
                </div>
                <div className={styles.column}>
                  <div className={styles.headline} style={{ opacity: 0 }}>
                    Contrl
                  </div>
                  <div
                    onClick={() => alert('Inpossible to delete own account')}
                    style={{ cursor: 'pointer' }}
                    className={styles.deleteElement}
                  >
                    <Delete width={18} height={18} fill="#B78467" />
                  </div>
                </div>
              </div>
              <div className={styles.upgrade}>
                Upgrade this account to Linkforme PRO to give other users access
                to manage it
              </div>
              <div className={styles.row}>
                <Button
                  full
                  text="Links"
                  onClick={() => {
                    router.push('/account/buttons');
                  }}
                  Icon={({ fill }) => (
                    <Links width={22} height={22} fill={fill} />
                  )}
                />
                <Button
                  full
                  text="Appearance"
                  onClick={() => {
                    router.push('/account/style');
                  }}
                  Icon={({ fill }) => (
                    <StyleSettings width={22} height={22} fill={fill} />
                  )}
                />
                <Button
                  full
                  text="Settings"
                  onClick={() => {
                    router.push('/account/settings');
                  }}
                  Icon={({ fill }) => (
                    <Settings width={22} height={22} fill={fill} />
                  )}
                />
                <Button
                  full
                  text="Upgrade to PRO"
                  onClick={() => {
                    router.push('/account/pro');
                  }}
                />
              </div>
            </div>
          </Container>
          <div className={styles.footer}>
            <div className={styles.row}>
              <Button
                full
                text="Reset Password"
                onClick={() => {
                  dispatch({
                    type: 'openPopup',
                    payload: {
                      method: 'resetpassword',
                      props: { width: 'auto' },
                    },
                  });
                }}
              />
              <Button
                full
                text="Delete Account"
                onClick={() => {
                  dispatch(deleteUser());
                }}
              />
            </div>
          </div>
        </div>
        {showPhone && (
          <div style={{ display: 'flex', flexShrink: 0 }}>
            <PhoneLayout>
              <Factory
                noEdit={true}
                userName={user.login}
                avatar={user.avatar}
                fields={fields}
              />
            </PhoneLayout>
          </div>
        )}
      </Layout>
  );
};

interface DinamicObj {
  [name: string]: any;
}

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

    if (user?.email) {
      userPayload.email = user.email;
    }

    if (userPayload.login) {
      store.dispatch({ type: 'setUser', payload: userPayload });
    }

    return { props: {} };
  },
);

export default AnalyticsScreen;
