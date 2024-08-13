// src/services/joke.service.ts
import { JokeRepository } from '../repository/joke.repository';
import { responseFormate } from '../models/response';
import { IJoke } from '../database/models/joke';
import {  IJokeType } from '../database/models/JokeType';

const jokeRepo = new JokeRepository();

export const submitJokeService = async (jokeData: Partial<IJoke>): Promise<responseFormate> => {
  try {
    const newJoke = await jokeRepo.createJoke(jokeData);
    return { code: 201, data: newJoke, message: 'Joke submitted successfully.' };
  } catch (error: any) {
    return { code: 500, message: 'Error submitting joke', error: error.message };
  }
};

export const getAllJokesService = async (): Promise<responseFormate> => {
  try {
    const jokes = await jokeRepo.getAllJokes();
    return { code: 200, data: jokes, message: 'Jokes fetched successfully.' };
  } catch (error: any) {
    return { code: 500, message: 'Error fetching jokes', error: error.message };
  }
};

export const getJokeTypesService = async (): Promise<responseFormate> => {
  try {
    const jokeTypes = await jokeRepo.getJokeTypes();
    return { code: 200, data: jokeTypes, message: 'Joke types fetched successfully.' };
  } catch (error: any) {
    return { code: 500, message: 'Error fetching joke types', error: error.message };
  }
};

export const createJokeTypeService = async (jokeTypeData: Partial<IJokeType>): Promise<responseFormate> => {
  try {
    const newJokeType = await jokeRepo.createJokeType(jokeTypeData);
    return { code: 201, data: newJokeType, message: 'Joke type created successfully.' };
  } catch (error: any) {
    return { code: 500, message: 'Error creating joke type', error: error.message };
  }
};
