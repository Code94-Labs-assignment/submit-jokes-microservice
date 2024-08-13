// src/controllers/joke.controller.ts
import { Request, Response } from "express";
import {
  submitJokeService,
  getJokeTypesService,
  getAllJokesService,
  createJokeTypeService,
} from "../service/jokeService";
import logger from "../utils/logger";

export const submitJoke = async (req: Request, res: Response) => {
  try {
    const response = await submitJokeService(req.body);
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error submitting joke: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getAllJokes = async (req: Request, res: Response) => {
  try {
    const response = await getAllJokesService();
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error fetching jokes: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getJokeTypes = async (req: Request, res: Response) => {
  try {
    const response = await getJokeTypesService();
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error fetching joke types: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const createJokeType = async (req: Request, res: Response) => {
  try {
    const response = await createJokeTypeService(req.body);
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error creating joke type: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
