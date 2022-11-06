import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
