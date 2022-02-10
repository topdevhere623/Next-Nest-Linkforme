import wrapper from 'src/client/store';
import { fetch } from 'src/shared/utils/fetch';
import Factory from 'src/client/components/factory';
import { Field } from 'src/server/users/interfaces/user.interface';
import Background from 'src/client/components/elements/background';

const Page = ({
  fields,
  login,
  avatar,
}: {
  fields: Field[];
  login: string;
  avatar: string;
}) => {
  return (
    <Background withBlur={true}>
      <Factory fields={fields} userName={login} avatar={avatar} noEdit={true} />
    </Background>
  );
};

export default Page;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (ctx: any) => {
    let error;
    const { fields, login, avatar, theme, notFound } = await fetch(
      '/api/getFields',
      {
        method: 'POST',
        body: JSON.stringify({ id: ctx.params.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => (error = err));

    const result: any = { fields, login };

    console.log('page.id', ctx.params.id, result);
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

    return {
      revalidate: 1,
      props: result,
    };
  },
);
