import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommomModule } from 'src/commom/commom.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[PokemonModule, CommomModule]
})
export class SeedModule {}
