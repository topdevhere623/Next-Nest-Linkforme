import type { MyAppContext } from 'MyModule';
import wrapper from 'src/client/store';
import Page from 'src/pages/[id]';
import { fetch } from 'src/shared/utils/fetch';

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: MyAppContext) => {
    let error;
    const { fields, login, avatar, theme, notFound } = await fetch(
      '/api/getFields',
      {
        method: 'POST',
        body: JSON.stringify({ id: ctx.req.params.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => (error = err));

    const result: any = { fields, login };
    console.log('req.params.id', ctx.req.params.id, result);

    if (error || notFound) {
      return {
        notFound: true,
      };
    }

    if (theme) {
      store.dispatch({ type: 'setTheme', payload: theme });
    }

    if (avatar) {
      result.avatar = avatar;
    }

    return { props: result };
  },
);
