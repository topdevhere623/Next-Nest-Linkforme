import Layout from 'src/client/components/layout';
import * as React from 'react';
import wrapper from 'src/client/store';
import { Fireworks, useFireworks } from 'fireworks-js/dist/react';

import type { MyAppContext } from 'MyModule';

const PlanScreen = () => {
  const { options } = useFireworks({
    initialStart: true,
    initialOptions: {
      hue: {
        min: 0,
        max: 345,
      },
      delay: {
        min: 15,
        max: 15,
      },
      rocketsPoint: 50,
      speed: 10,
      acceleration: 1.2,
      friction: 0.96,
      gravity: 1,
      particles: 90,
      trace: 3,
      explosion: 6,
      autoresize: true,
      brightness: {
        min: 50,
        max: 80,
        decay: {
          min: 0.015,
          max: 0.03,
        },
      },
      boundaries: {
        visible: false,
      },
      sound: {
        enabled: false,
        files: [
          'https://fireworks.js.org/sounds/explosion0.mp3',
          'https://fireworks.js.org/sounds/explosion1.mp3',
          'https://fireworks.js.org/sounds/explosion2.mp3',
        ],
        volume: {
          min: 1,
          max: 2,
        },
      },
      mouse: {
        click: true,
        move: false,
        max: 1,
      },
    },
  });

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: '#000',
  };

  return (
    <>
      <Layout>
        <div
          style={{ position: 'relative', width: '100%', height: '100%' }}
          className="wrapper"
        >
          <h1>COMING SOON!</h1>
          {/* @ts-ignore */}
          <Fireworks style={style} enabled={true} options={options}></Fireworks>
        </div>
      </Layout>
      <style global jsx>{`
        body {
          background: black;
        }
        header,
        div.sitebarGlobal {
          transition: all 0.3s ease;
          filter: invert(100%);
        }
      `}</style>
      <style jsx>{`
        h1 {
          color: #fff;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          z-index: 10;
          margin: 0;
          font-size: 50px;
        }
        @media screen and (max-width: 600px) {
          .wrapper {
            height: calc(100vh - 110px) !important;
          }
        }
      `}</style>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: MyAppContext) => {
    const user = ctx.req.user;

    if (user && user.login) {
      store.dispatch({ type: 'setUser', payload: { login: user.login } });
    }

    if (user?._id) {
      store.dispatch({ type: 'setLink', payload: user._id });
    }

    return { props: {} };
  },
);

export default PlanScreen;
