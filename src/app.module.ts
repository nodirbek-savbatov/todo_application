import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { appConfig, databaseConfig } from './config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule, Task, TasksModule, User, UserModule } from '@modules';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig,databaseConfig]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) =>({
      dialect: 'postgres',
      host: config.get('database.host'),
      port: config.get<number>('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.dbName'),
      models: [User,Task],
      synchronize: true,
      // sync: {force: true},
      logging: console.log, 
      autoLoadModels: true,
    })
  }),
  JwtModule.register({
    global: true,
    secret: 'my-secret-key',
    signOptions: { expiresIn: 120 },
  }),
  AuthModule,
  UserModule,
  TasksModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
