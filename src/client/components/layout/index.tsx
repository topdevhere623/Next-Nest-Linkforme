import styles from './styles.module.sass';
import Header from '../header';
import SideBar from '../sitebar';
import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import { useMediaQueryMin } from 'src/client/hooks';
import { IStoreState } from 'src/client/store/reducers';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps) {
  const isDesktop = useMediaQueryMin(1300),
    dispatch = useDispatch(),
    menuIsOpen = useSelector((state: IStoreState) => state.factory.menuIsOpen),
    menuSetupOnce = useSelector(
      (state: IStoreState) => state.factory.menuSetupOnce,
    ),
    setMenuIsOpen = (value: boolean) => {
      dispatch({ type: 'setMenu', payload: value });
    };

  useEffect(() => {
    if (!menuSetupOnce && typeof isDesktop === 'boolean') {
      setMenuIsOpen(!!isDesktop);
    }
  }, [isDesktop]);

  return (
    <div className={styles.layout}>
      <Header menuIsOpen={menuIsOpen} setMenuOpen={setMenuIsOpen} />
      <div className={styles.wrapper}>
        <SideBar isOpen={menuIsOpen} setMenuOpen={setMenuIsOpen} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;