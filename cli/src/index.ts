import { CommandFactory } from 'nest-commander';

import { CliModule } from './lib/cli.module.js'

async function bootstrap() {
  await CommandFactory.run(CliModule, ['warn', 'error']);
}

bootstrap();