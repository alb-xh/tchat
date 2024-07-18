import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { isProduction } from '../helpers';
import { options } from './dataSource';
import { User } from './entities/user.entity';
import { Chat } from './entities/chat.entity';

const entities = [ User, Chat ];

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...options, entities, host: isProduction() ? options.serviceName : options.host }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [ TypeOrmModule ]
})
export class DbModule {}