// src/controllers/joke.controller.ts
import { Request, Response } from "express";
import {
  submitJokeService,
  getJokeTypesService,
  getAllJokesService,
  createJokeTypeService,
  approveJokeService,
  getPendingJokesService,
  rejectJokeService,
  updateJokeService,
} from "../service/jokeService";
import logger from "../utils/logger";

export const submitJoke = async (req: Request, res: Response) => {
  try {
    const { setup, punchline, type, author } = req.body;

    if (!type || !type._id || !type.name) {
      return res.status(400).send({ message: "Invalid type provided" });
    }
    const response = await submitJokeService({
      setup,
      punchline,
      type,
      author,
    });
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

export const getPendingJokes = async (req: Request, res: Response) => {
  try {
    const response = await getPendingJokesService();
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error fetching pending jokes: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateJoke = async (req: Request, res: Response) => {
  try {
    const response = await updateJokeService(req.params.id, req.body);
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error updating joke: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const approveJoke = async (req: Request, res: Response) => {
  try {
    const response = await approveJokeService(req.params.id);
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error approving joke: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const rejectJoke = async (req: Request, res: Response) => {
  try {
    const response = await rejectJokeService(req.params.id);
    res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Error rejecting joke: ${error.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
