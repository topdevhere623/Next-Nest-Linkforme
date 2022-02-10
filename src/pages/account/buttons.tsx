import Layout from 'src/client/components/layout'
import {useSelector} from "react-redux";
import * as React from "react";
import {IStoreState} from "src/client/store/reducers";
import wrapper from "src/client/store";
import Factory from 'src/client/components/factory'

import type { MyAppContext } from 'MyModule'
import PhoneLayout from 'src/client/components/phoneLayout';

interface DinamicObj {
    [name: string]: any
}

const ButtonsScreen = () => {
  const fields = useSelector( (state:IStoreState) => state.factory.fields )
  const user = useSelector( (state:IStoreState) => state.factory.user )
  return (
    <Layout>
        <PhoneLayout>
          <Factory userName={user.login} avatar={user.avatar} fields={fields} />
        </PhoneLayout>
    </Layout>
  )
}

export default ButtonsScreen;

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx: MyAppContext) => {
  const user = ctx.req.user;

  if(user?.fields?.length){
    store.dispatch({type: 'setFields', payload: user.fields})
  }

  if(user?._id){
    store.dispatch({type: 'setLink', payload: user._id})
  }

  if(user?.theme){
    store.dispatch({type: 'setTheme', payload: user.theme})
  }

  const userPayload: DinamicObj = {login: user.login}

  if(user?.avatar){
      userPayload.avatar = user.avatar;
  }

  if(userPayload.login){
    store.dispatch({type: 'setUser', payload: userPayload})
  }

  return {props: {}}
});