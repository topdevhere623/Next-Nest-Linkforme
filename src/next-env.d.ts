// next-env.d.ts
module 'MyModule' {
  type AppContext = import('next/app').GetServerSidePropsContext

  export declare interface MyAppContext extends AppContext {
    req: AppContext['ctx']['req'] & {
        user?: import('./server/users/interfaces/user.interface').User,
    },
  }

//   type AppContext2 = import('next/app').GetStaticPropsContext

//   export declare interface MyAppContext extends AppContext {
//     req: AppContext['ctx']['req'] & {
//         user?: import('./server/users/interfaces/user.interface').User,
//     },
//   }
}