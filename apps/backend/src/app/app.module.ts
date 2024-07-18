import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DbModule } from "./db/db.module";
import { WsGateway } from "./websocket.gateway";

@Module({
  imports: [ ConfigModule, DbModule ],
  providers: [ WsGateway ]
})
export class AppModule {}
