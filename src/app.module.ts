import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommomModule } from './commom/commom.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/env.config';


@Module({
  imports: [
    // activar las variables de entorno(necesario que sea uno de los primeros imports)
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      //Joi validation es para enviar errores si es que
      validationSchema: JoiValidationSchema
    }), 
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommomModule,

    SeedModule
    ]
})
export class AppModule {
  constructor(){
    console.log(process.env)
  }
}
