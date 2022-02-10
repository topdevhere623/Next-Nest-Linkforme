import { DynamicModule, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GridfsModule } from './gridfs/gridfs.module';
import { AuthMiddleware } from './auth.middleware';
import { MailerModule } from '@nestjs-modules/mailer';

declare const module: any;

@Module({})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/_next/image', '/_next/static/**', '/_next/chunks/**', '/_next/webpack-hmr')
      .forRoutes(
        '/_next/data/**/account.json',
        '/_next/data/**/account/buttons.json',
        '/_next/data/**/account/analytics.json',
        '/_next/data/**/account/pro.json',
        '/_next/data/**/account/settings.json',
        '/_next/data/**/account/style.json',
      );
  }
  public static initialize(): DynamicModule {
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      }),
      mailerModule = MailerModule.forRootAsync({
          useFactory: () => ({
            transport: 'smtps://mailcow@linkmefor.com:nqt3zad_ueh9qmb_ZEM@mail.linkmefor.com',
          }),
        });

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [
        renderModule,
        AuthModule,
        UsersModule,
        GridfsModule,
        AnalyticsModule,
        mailerModule
      ],
      controllers: [AppController],
      providers: [],
    };
  }
}
