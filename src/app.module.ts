import {Module} from '@nestjs/common'
import {AppConfigModule} from './config/config.module'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import DatabaseModule from './database/database.module'
import {ProductModule} from './domain/product/product.module'

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
