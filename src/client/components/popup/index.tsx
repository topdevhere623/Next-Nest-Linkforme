import React, { Component, ReactNode, useRef, CSSProperties } from 'react';
import styles from './style.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import Thumb from './thumb';
import ThumbSet from './thumbSet';
import Lock from './lock';
import Unlock from './unlock';
import Clock from './clock';
import Spotify from './spotify';
import AppleMusic from './applemusic';
import YandexMusic from './yandexmusic';
import ResetPassword from './resetPassword';
import ConfirmCookies from './confirmCookies';

import { Transition } from 'react-transition-group';
import { IStoreState } from 'src/client/store/reducers';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, top 100ms ease-in-out`,
};

const transitionStyles = {
  entering: { opacity: 0, top: '100%' },
  entered: { opacity: 1, top: '0' },
  exiting: { opacity: 0, top: '0' },
  exited: { opacity: 0, top: '100%' },
  unmounted: { opacity: 0, top: '100%' },
};

const PopupWrapper = ({
  active,
  children,
  width,
  style,
  noOverflow,
  method
}: {
  active: boolean;
  children: ReactNode;
  width?: number;
  style?: CSSProperties;
  noOverflow?: boolean;
  method?:string;
}) => {
  const dispatch = useDispatch();
  const Close = () => (
    <div
      className={styles.close}
      onClick={() => dispatch({ type: 'openPopup', payload: { method: '' } })}
    >
      +
    </div>
  );
  const closeRef = useRef(null);
  let additionalStyle: any = {};
  if (width) {
    additionalStyle.width = width;
  }
  if (style) {
    additionalStyle = { ...additionalStyle, ...style}
  }
  return (
    <Transition in={active} timeout={duration} unmountOnExit>
      {(state) => (
        <div
          ref={closeRef}
          className={`${styles.popupWrapper} ${noOverflow ? styles.noOverflow : ""}`}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          onClick={(e) => {
            if (e.target === closeRef.current) {
              dispatch({ type: 'openPopup', payload: { method: '' } });
            }
          }}
        >
          <div className={styles.overflow}>
            <div
              className={`${styles.popupWindow} ${method ? styles[method] : ""}`}
              style={{ ...additionalStyle }}
            >
              <Close />
              {children}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

const Popup = () => {
  const popup = useSelector((state: IStoreState) => state.factory.popup);

  return (
    <>
      <PopupWrapper active={popup.method == 'thumb'}>
        <Thumb
          fieldId={popup.props?.fieldId}
          singleEdit={popup.props?.singleEdit}
        />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'thumbSet'}>
        <ThumbSet
          fieldId={popup.props?.fieldId}
          singleEdit={popup.props?.singleEdit}
        />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'lock'}>
        <Lock singleEdit={popup.props?.singleEdit} field={popup.props?.field} />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'unlock'}>
        <Unlock data={popup.props?.data} unlock={popup.props?.unlock} />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'clock'}>
        <Clock
          singleEdit={popup.props?.singleEdit}
          field={popup.props?.field}
        />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'spotify'}>
        <Spotify uri={popup.props?.uri} />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'applemusic'}>
        <AppleMusic uri={popup.props?.uri} />
      </PopupWrapper>
      <PopupWrapper active={popup.method == 'yandexmusic'}>
        <YandexMusic uri={popup.props?.uri} />
      </PopupWrapper>
      <PopupWrapper
        active={popup.method == 'resetpassword'}
        width={popup.props?.width}
      >
        <ResetPassword />
      </PopupWrapper>
      <PopupWrapper
        active={popup.method == 'confirm_cookies'}
        method={popup.method}
        style={popup.props?.style}
        noOverflow={popup.props?.noOverflow}
      >
        <ConfirmCookies />
      </PopupWrapper>
    </>
  );
};

export default Popup;
