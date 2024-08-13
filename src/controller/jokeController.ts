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
import { BadRequestError } from "../models/errors";

export const submitJoke = async (req: Request, res: Response) => {
  logger.info(`Controller - submitJoke: Start - ${JSON.stringify(req.body)}`);

  try {
    const { setup, punchline, type, author } = req.body;

    if (!type || !type._id || !type.name) {
      throw new BadRequestError("Invalid type provided");
    }

    const response = await submitJokeService({
      setup,
      punchline,
      type,
      author,
    });
    logger.info(
      `Controller - submitJoke: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - submitJoke: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getAllJokes = async (req: Request, res: Response) => {
  logger.info("Controller - getAllJokes: Start");

  try {
    const response = await getAllJokesService();
    logger.info(
      `Controller - getAllJokes: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - getAllJokes: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getJokeTypes = async (req: Request, res: Response) => {
  logger.info("Controller - getJokeTypes: Start");

  try {
    const response = await getJokeTypesService();
    logger.info(
      `Controller - getJokeTypes: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - getJokeTypes: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const createJokeType = async (req: Request, res: Response) => {
  logger.info(
    `Controller - createJokeType: Start - ${JSON.stringify(req.body)}`,
  );

  try {
    const response = await createJokeTypeService(req.body);
    logger.info(
      `Controller - createJokeType: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - createJokeType: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getPendingJokes = async (req: Request, res: Response) => {
  logger.info("Controller - getPendingJokes: Start");

  try {
    const response = await getPendingJokesService();
    logger.info(
      `Controller - getPendingJokes: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - getPendingJokes: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const updateJoke = async (req: Request, res: Response) => {
  logger.info(
    `Controller - updateJoke: Start - ID: ${req.params.id}, Body: ${JSON.stringify(req.body)}`,
  );

  try {
    const response = await updateJokeService(req.params.id, req.body);
    logger.info(
      `Controller - updateJoke: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - updateJoke: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const approveJoke = async (req: Request, res: Response) => {
  logger.info(`Controller - approveJoke: Start - ID: ${req.params.id}`);

  try {
    const response = await approveJokeService(req.params.id);
    logger.info(
      `Controller - approveJoke: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - approveJoke: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const rejectJoke = async (req: Request, res: Response) => {
  logger.info(`Controller - rejectJoke: Start - ID: ${req.params.id}`);

  try {
    const response = await rejectJokeService(req.params.id);
    logger.info(
      `Controller - rejectJoke: Success - ${JSON.stringify(response)}`,
    );
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error(`Controller - rejectJoke: Error - ${error.message}`, {
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};
