import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DbModule } from "./db/db.module";
import { Gateway } from "./websocket/gateway";

@Module({
  imports: [ ConfigModule, DbModule ],
  providers: [ Gateway ]
})
export class AppModule {}
