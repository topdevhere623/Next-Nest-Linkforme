import Layout from 'src/client/components/layout'
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {IStoreState} from "src/client/store/reducers";
import wrapper from "src/client/store";
import styles from '../../client/styles/analytics.module.sass';
import {getAnalytics} from 'src/client/store/factory/actions'
import { Doughnut } from 'react-chartjs-2';
import { fetch } from 'src/shared/utils/fetch';

import type { MyAppContext } from 'MyModule'
import Link from 'next/link';

const AnalyticsScreen = () => {
  const dispatch = useDispatch()
  const analytics = useSelector( (state:IStoreState) => state.factory.analytics )
  React.useEffect(()=>{
    dispatch(getAnalytics())
    const timer = setInterval(()=>{
      dispatch(getAnalytics())
    }, 10000)

    return ()=>{
      clearInterval(timer)
    }
  }, []);

  const data = {
    labels: analytics.chart?.map(item => item.name || 'Button'),
    // labels: Array.apply(null, Array(100)).map(function (x, i) { return "Button " + i; }),
    datasets: [
      {
        label: '',
        data: analytics.chart?.map(item => item.value),
        backgroundColor: [
          '#9D5C82',
          '#36225D',
          '#2887A6',
          '#10BC8F',
          '#FF5A5B',
          '#6BEEDD',
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Layout>
        <div className={styles.analytics}>
          <div className={`${styles.row} ${styles.main}`}>
            <div className={styles.info}>
              <h1>Lifetime Analytics</h1>
              <div className={styles.row}>
                <div style={{marginRight: 20}}>Views: {analytics.views}</div>
                <div>Clicks: {analytics.clicks}</div>
              </div>
              <Link href="/account/pro"><button>Add Pixel</button></Link>
            </div>
            <div className={styles.chart}>
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        pointStyle: 'rectRounded',
                        usePointStyle: true,
                        color: '#000'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx: MyAppContext) => {

  const {user, analyticsData, cookies} = ctx.req;

  if(analyticsData){
    store.dispatch({type: 'setAnalytics', payload: analyticsData})
  }else{

    const options:any = {
      method: 'GET',
    }

    if(cookies?.jwt){
        options.headers = {Cookie: 'jwt='+cookies.jwt}
    }
    
    const result = await fetch('/api/getAnalytics', options).catch(() => undefined )

    if(result){
      store.dispatch({type: 'setAnalytics', payload: result})
    }
  }

  if(user?._id){
    store.dispatch({type: 'setLink', payload: user._id})
  }

  if(user?.login){
    store.dispatch({type: 'setUser', payload: { login: user.login}})
  }

  return {props: {}}
});

export default AnalyticsScreen;