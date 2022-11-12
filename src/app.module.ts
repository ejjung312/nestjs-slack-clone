import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

// 외부 서버에서 비밀키 가져올 경우
/*
const getEnv = async () => {
  const response = await axios.get('/비밀키요청')
  return response.data;
  // return {
  //   DB_PWD: 'nestjsbook',
  //   NAME: '정은지',
  // };
};
*/

@Module({
  // imports: [ConfigModule.forRoot({ isGlobal: true, load: [getEnv] })],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})

// 미들웨어 연결
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
