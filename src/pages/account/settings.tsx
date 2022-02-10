import Layout from 'src/client/components/layout';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { IStoreState } from 'src/client/store/reducers';
import wrapper from 'src/client/store';
import { addSocialIcon, uploadFields } from 'src/client/store/factory/actions';
import styles from '../../client/styles/settings.module.sass';
import Factory from 'src/client/components/factory';
import PhoneLayout from 'src/client/components/phoneLayout';
import Container from 'src/client/components/container';
import { isValidHttpUrl } from 'src/shared/utils/fetch';

import MailIcon from '../../client/static/socialIcons/mail.svg';
import FacebookIcon from '../../client/static/socialIcons/facebook.svg';
import TwitterIcon from '../../client/static/socialIcons/twitter.svg';
import TiktokIcon from '../../client/static/socialIcons/tiktok.svg';
import InstagramIcon from '../../client/static/socialIcons/instagram.svg';
import YoutubeIcon from '../../client/static/socialIcons/youtube.svg';
import LinkedinIcon from '../../client/static/socialIcons/linkedin.svg';
import SoundcloudIcon from '../../client/static/socialIcons/soundcloud.svg';
import BandcampIcon from '../../client/static/socialIcons/bandcamp.svg';
import ClubhouseIcon from '../../client/static/socialIcons/clubhouse.svg';
import SubstackIcon from '../../client/static/socialIcons/substack.svg';
import WhatsappIcon from '../../client/static/socialIcons/whatsapp.svg';
import TelegramIcon from '../../client/static/socialIcons/telegram.svg';
import SignalIcon from '../../client/static/socialIcons/signal.svg';
import TwitchIcon from '../../client/static/socialIcons/twitch.svg';
import PatreonIcon from '../../client/static/socialIcons/patreon.svg';
import CameoIcon from '../../client/static/socialIcons/cameo.svg';
import PinterestIcon from '../../client/static/socialIcons/pinterest.svg';
import SpotifyIcon from '../../client/static/socialIcons/spotify.svg';
import AmazonIcon from '../../client/static/socialIcons/amazon.svg';
import ApplemusicIcon from '../../client/static/socialIcons/applemusic.svg';
import SnapchatIcon from '../../client/static/socialIcons/snapchat.svg';

import type { MyAppContext } from 'MyModule';
import { ReactElement, useEffect, useState } from 'react';
import useMediaQuery from 'src/client/hooks';
import { Field } from 'src/server/users/interfaces/user.interface';

interface DinamicObj {
  [name: string]: any;
}

const RightSidePhone = () => {
  const fields = useSelector((state: IStoreState) => state.factory.fields);
  const user = useSelector((state: IStoreState) => state.factory.user);
  const menuIsOpen = useSelector((state: IStoreState) => state.factory.menuIsOpen);
  const isMobile = useMediaQuery(960);
  const isBreakpointOfBag = useMediaQuery(1150);

  let showPhone = true;
  if((isBreakpointOfBag && menuIsOpen) || isMobile){
    showPhone = false;
  }

  return (
    <>
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
    </>
  );
};

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const setExistField = (
    value: string,
    field: Field | undefined,
    type: string,
    title?: string,
  ) => {
    if (field) {
      dispatch({
        type: 'updateFieldSingle',
        payload: { value, fieldName: 'link', fieldId: field.id },
      });
    } else {
      dispatch(
        addSocialIcon({
          type: 'socialIcon-' + type,
          link: value,
          title: title,
        }),
      );
    }
  };

  const InputWithIcon = ({
    Icon,
    placeholder,
    type,
  }: {
    Icon?: ({ fill }: { fill: string }) => ReactElement;
    placeholder: string;
    type: string;
  }) => {
    
    const field = useSelector((state: IStoreState) =>
      state.factory.fields.filter((item) => item.type === 'socialIcon-' + type),
    )[0];
    const [error, setError] = useState(!field?.link ? false : !isValidHttpUrl(field?.link))
    // const [value, setValue] = useState(field?.link ?? '');
    useEffect(() => {
      if (!field) {
        setExistField('', field, type, placeholder);
      }
    }, [field]);
    return (
      <div className={styles.socialIconInput}>
        <input
          type="text"
          value={field?.link}
          onChange={(e) => {
            setExistField(e.target.value, field, type);
          }}
          className={error ? styles.inputError : ""}
          placeholder={placeholder}
          key={field?.id}
          onBlur={() => {
            setError(!isValidHttpUrl(field?.link))
            dispatch(uploadFields());
          }}
        />
        {Icon && (
          <div className={styles.icon}>
            <Icon fill={field?.link ? error ? '#FF5B5B' : '#B78467' : '#EAD2C4'} />
          </div>
        )}
      </div>
    );
  };
  return (
      <Layout>
        <div className={styles.wrapper}>
          <Container style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }} className={styles.myInformation}>
              <h1>Social icons</h1>
              <div className={styles.row}>
                <InputWithIcon
                  placeholder="Mail"
                  type="email"
                  Icon={({ fill }) => <MailIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Facebook"
                  type="facebook"
                  Icon={({ fill }) => <FacebookIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Twitter"
                  type="twitter"
                  Icon={({ fill }) => <TwitterIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="TikTok"
                  type="tiktok"
                  Icon={({ fill }) => <TiktokIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Instagram"
                  type="instagram"
                  Icon={({ fill }) => <InstagramIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="YouTube"
                  type="youtube"
                  Icon={({ fill }) => <YoutubeIcon width={25} stroke={fill} />}
                />
                <InputWithIcon
                  placeholder="LinkedIn"
                  type="linkedin"
                  Icon={({ fill }) => <LinkedinIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="SoundCloud"
                  type="soundcloud"
                  Icon={({ fill }) => <SoundcloudIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Bandcamp"
                  type="bandcamp"
                  Icon={({ fill }) => <BandcampIcon width={25} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Clubhouse"
                  type="clubhouse"
                  Icon={({ fill }) => <ClubhouseIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Substack"
                  type="substack"
                  Icon={({ fill }) => <SubstackIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="WhatsApp"
                  type="whatsApp"
                  Icon={({ fill }) => <WhatsappIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Signal"
                  type="signal"
                  Icon={({ fill }) => <SignalIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Telegram"
                  type="telegram"
                  Icon={({ fill }) => <TelegramIcon width={24} stroke={fill} />}
                />
                <InputWithIcon
                  placeholder="Patreon"
                  type="patreon"
                  Icon={({ fill }) => <PatreonIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Twitch"
                  type="twitch"
                  Icon={({ fill }) => <TwitchIcon width={22} stroke={fill} />}
                />
                <InputWithIcon
                  placeholder="Pinterest"
                  type="pinterest"
                  Icon={({ fill }) => <PinterestIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Cameo"
                  type="cameo"
                  Icon={({ fill }) => <CameoIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Amazon"
                  type="amazon"
                  Icon={({ fill }) => <AmazonIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Spotify"
                  type="spotify"
                  Icon={({ fill }) => <SpotifyIcon width={22} fill={fill} />}
                />
                <InputWithIcon
                  placeholder="Snapchat"
                  type="snapchat"
                  Icon={({ fill }) => <SnapchatIcon width={22} stroke={fill} />}
                />
                <InputWithIcon
                  placeholder="Apple Music"
                  type="applemusic"
                  Icon={({ fill }) => <ApplemusicIcon width={22} fill={fill} />}
                />
              </div>
            </div>
          </Container>
        </div>
        <RightSidePhone />
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

    if (user?.email) {
      userPayload.email = user.email;
    }

    if (userPayload.login) {
      store.dispatch({ type: 'setUser', payload: userPayload });
    }

    return { props: {} };
  },
);

export default SettingsScreen;
