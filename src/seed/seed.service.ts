import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/commom/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ) {}

  async executeSeed() {
    //eliminar informacion de la colección
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];
    //insertar multiples registros de manera óptima
    // const insertPromisesArray = []

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      //insertar de forma básica pero para una gran cantidad no es lo ideal
      // const pokemon = await this.pokemonModel.create({name,no})

      //insertar multiples registros de manera óptima
      // insertPromisesArray.push(this.pokemonModel.create({name,no}))
      //insertar multiples registros mucho más óptima que la anterior
      pokemonToInsert.push({ name, no });
    });
    //insertar multiples registros de manera óptima
    // await Promise.all(insertPromisesArray)
    //insertar multiples registros mucho más óptima que la anterior
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
