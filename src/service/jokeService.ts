import { JokeRepository } from "../repository/joke.repository";
import { responseFormate } from "../models/response";
import { IJoke } from "../database/models/joke";
import { IJokeType } from "../database/models/JokeType";
import { NotFoundError, BadRequestError } from "../models/errors";
import logger from "../utils/logger";

const jokeRepo = new JokeRepository();

export const submitJokeService = async (jokeData: Partial<IJoke>): Promise<responseFormate> => {
  logger.info("Service - submitJokeService: Start", { jokeData });
  try {
    const newJoke = await jokeRepo.createJoke(jokeData);
    logger.info("Service - submitJokeService: Success", { newJoke });
    return { code: 201, data: newJoke, message: "Joke submitted successfully." };
  } catch (error: any) {
    logger.error("Service - submitJokeService: Error", { message: error.message, stack: error.stack });
    throw new BadRequestError("Error submitting joke");
  }
};

export const getAllJokesService = async (): Promise<responseFormate> => {
  logger.info("Service - getAllJokesService: Start");
  try {
    const jokes = await jokeRepo.getAllJokes();
    logger.info("Service - getAllJokesService: Success", { jokes });
    return { code: 200, data: jokes, message: "Jokes fetched successfully." };
  } catch (error: any) {
    logger.error("Service - getAllJokesService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error fetching jokes");
  }
};

export const getJokeTypesService = async (): Promise<responseFormate> => {
  logger.info("Service - getJokeTypesService: Start");
  try {
    const jokeTypes = await jokeRepo.getJokeTypes();
    logger.info("Service - getJokeTypesService: Success", { jokeTypes });
    return { code: 200, data: jokeTypes, message: "Joke types fetched successfully." };
  } catch (error: any) {
    logger.error("Service - getJokeTypesService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error fetching joke types");
  }
};

export const createJokeTypeService = async (jokeTypeData: Partial<IJokeType>): Promise<responseFormate> => {
  logger.info("Service - createJokeTypeService: Start", { jokeTypeData });
  try {
    const newJokeType = await jokeRepo.createJokeType(jokeTypeData);
    logger.info("Service - createJokeTypeService: Success", { newJokeType });
    return { code: 201, data: newJokeType, message: "Joke type created successfully." };
  } catch (error: any) {
    logger.error("Service - createJokeTypeService: Error", { message: error.message, stack: error.stack });
    throw new BadRequestError("Error creating joke type");
  }
};

export const getPendingJokesService = async (): Promise<responseFormate> => {
  logger.info("Service - getPendingJokesService: Start");
  try {
    const pendingJokes = await jokeRepo.getPendingJokes();
    logger.info("Service - getPendingJokesService: Success", { pendingJokes });
    return { code: 200, data: pendingJokes, message: "Pending jokes fetched successfully." };
  } catch (error: any) {
    logger.error("Service - getPendingJokesService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error fetching pending jokes");
  }
};

export const updateJokeService = async (id: string, jokeData: Partial<IJoke>): Promise<responseFormate> => {
  logger.info("Service - updateJokeService: Start", { id, jokeData });
  try {
    const updatedJoke = await jokeRepo.updateJoke(id, jokeData);
    logger.info("Service - updateJokeService: Success", { updatedJoke });
    return { code: 200, data: updatedJoke, message: "Joke updated successfully." };
  } catch (error: any) {
    logger.error("Service - updateJokeService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error updating joke");
  }
};

export const approveJokeService = async (id: string): Promise<responseFormate> => {
  logger.info("Service - approveJokeService: Start", { id });
  try {
    const approvedJoke = await jokeRepo.approveJoke(id);
    logger.info("Service - approveJokeService: Success", { approvedJoke });
    return { code: 200, data: approvedJoke, message: "Joke approved successfully." };
  } catch (error: any) {
    logger.error("Service - approveJokeService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error approving joke");
  }
};

export const rejectJokeService = async (id: string): Promise<responseFormate> => {
  logger.info("Service - rejectJokeService: Start", { id });
  try {
    await jokeRepo.deleteJoke(id);
    logger.info("Service - rejectJokeService: Success", { id });
    return { code: 200, message: "Joke rejected and deleted successfully." };
  } catch (error: any) {
    logger.error("Service - rejectJokeService: Error", { message: error.message, stack: error.stack });
    throw new NotFoundError("Error rejecting joke");
  }
};
