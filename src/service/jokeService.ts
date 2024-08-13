import { JokeRepository } from "../repository/joke.repository";
import { responseFormate } from "../models/response";
import { IJoke } from "../database/models/joke";
import { IJokeType } from "../database/models/JokeType";
import { NotFoundError, BadRequestError } from "../models/errors";
import logger from "../utils/logger";

const jokeRepo = new JokeRepository();

export const submitJokeService = async (
  jokeData: Partial<IJoke>,
): Promise<responseFormate> => {
  logger.info(
    `Service - submitJokeService: Start - ${JSON.stringify(jokeData)}`,
  );
  try {
    const newJoke = await jokeRepo.createJoke(jokeData);
    const response = {
      code: 201,
      data: newJoke,
      message: "Joke submitted successfully.",
    };
    logger.info(
      `Service - submitJokeService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - submitJokeService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new BadRequestError("Error submitting joke");
  }
};

export const getAllJokesService = async (): Promise<responseFormate> => {
  logger.info("Service - getAllJokesService: Start");
  try {
    const jokes = await jokeRepo.getAllJokes();
    const response = {
      code: 200,
      data: jokes,
      message: "Jokes fetched successfully.",
    };
    logger.info(
      `Service - getAllJokesService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - getAllJokesService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error fetching jokes");
  }
};

export const getJokeTypesService = async (): Promise<responseFormate> => {
  logger.info("Service - getJokeTypesService: Start");
  try {
    const jokeTypes = await jokeRepo.getJokeTypes();
    const response = {
      code: 200,
      data: jokeTypes,
      message: "Joke types fetched successfully.",
    };
    logger.info(
      `Service - getJokeTypesService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - getJokeTypesService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error fetching joke types");
  }
};

export const createJokeTypeService = async (
  jokeTypeData: Partial<IJokeType>,
): Promise<responseFormate> => {
  logger.info(
    `Service - createJokeTypeService: Start - ${JSON.stringify(jokeTypeData)}`,
  );
  try {
    const newJokeType = await jokeRepo.createJokeType(jokeTypeData);
    const response = {
      code: 201,
      data: newJokeType,
      message: "Joke type created successfully.",
    };
    logger.info(
      `Service - createJokeTypeService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - createJokeTypeService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new BadRequestError("Error creating joke type");
  }
};

export const getPendingJokesService = async (): Promise<responseFormate> => {
  logger.info("Service - getPendingJokesService: Start");
  try {
    const pendingJokes = await jokeRepo.getPendingJokes();
    const response = {
      code: 200,
      data: pendingJokes,
      message: "Pending jokes fetched successfully.",
    };
    logger.info(
      `Service - getPendingJokesService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - getPendingJokesService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error fetching pending jokes");
  }
};

export const updateJokeService = async (
  id: string,
  jokeData: Partial<IJoke>,
): Promise<responseFormate> => {
  logger.info(
    `Service - updateJokeService: Start - ID: ${id}, Data: ${JSON.stringify(jokeData)}`,
  );
  try {
    const updatedJoke = await jokeRepo.updateJoke(id, jokeData);
    const response = {
      code: 200,
      data: updatedJoke,
      message: "Joke updated successfully.",
    };
    logger.info(
      `Service - updateJokeService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - updateJokeService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error updating joke");
  }
};

export const approveJokeService = async (
  id: string,
): Promise<responseFormate> => {
  logger.info(`Service - approveJokeService: Start - ID: ${id}`);
  try {
    const approvedJoke = await jokeRepo.approveJoke(id);
    const response = {
      code: 200,
      data: approvedJoke,
      message: "Joke approved successfully.",
    };
    logger.info(
      `Service - approveJokeService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - approveJokeService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error approving joke");
  }
};

export const rejectJokeService = async (
  id: string,
): Promise<responseFormate> => {
  logger.info(`Service - rejectJokeService: Start - ID: ${id}`);
  try {
    await jokeRepo.deleteJoke(id);
    const response = {
      code: 200,
      message: "Joke rejected and deleted successfully.",
    };
    logger.info(
      `Service - rejectJokeService: Success - ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    logger.error(`Service - rejectJokeService: Error - ${error.message}`, {
      stack: error.stack,
    });
    throw new NotFoundError("Error rejecting joke");
  }
};
