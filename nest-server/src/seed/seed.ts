import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seedService = app.get(SeedService);
  const args = process.argv.slice(2);

  if (args.includes('--reset')) {
    console.log('⚠️ Resetting all data...');
    await seedService.run({ reset: true });
  } else {
    console.log('✨ Seeding new data only...');
    await seedService.run({ reset: false });
  }
  await app.close();
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
