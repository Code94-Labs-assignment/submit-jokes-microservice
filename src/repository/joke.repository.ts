// src/repository/joke.repository.ts
import { Joke, IJoke } from '../database/models/joke';
import { JokeType, IJokeType } from '../database/models/JokeType';

export class JokeRepository {
  async createJoke(joke: Partial<IJoke>) {
    const newJoke = new Joke(joke);
    return newJoke.save();
  }

  async getAllJokes() {
    return Joke.find().populate('type', 'name'); // Populate the type field with the joke type name
  }

  async getJokeTypes() {
    return JokeType.find();
  }

  async createJokeType(jokeTypeData: Partial<IJokeType>) {
    const newJokeType = new JokeType(jokeTypeData);
    return newJokeType.save();
  }
}
