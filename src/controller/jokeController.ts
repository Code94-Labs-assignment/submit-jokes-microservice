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
import { AppError, BadRequestError, NotFoundError } from "../models/errors"; // Import your custom errors

export const submitJoke = async (req: Request, res: Response) => {
  logger.info("Controller - submitJoke: Start", { body: req.body });

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
    logger.info("Controller - submitJoke: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - submitJoke: Error", {
      message: error.message,
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
    logger.info("Controller - getAllJokes: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - getAllJokes: Error", {
      message: error.message,
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
    logger.info("Controller - getJokeTypes: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - getJokeTypes: Error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const createJokeType = async (req: Request, res: Response) => {
  logger.info("Controller - createJokeType: Start", { body: req.body });

  try {
    const response = await createJokeTypeService(req.body);
    logger.info("Controller - createJokeType: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - createJokeType: Error", {
      message: error.message,
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
    logger.info("Controller - getPendingJokes: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - getPendingJokes: Error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const updateJoke = async (req: Request, res: Response) => {
  logger.info("Controller - updateJoke: Start", {
    id: req.params.id,
    body: req.body,
  });

  try {
    const response = await updateJokeService(req.params.id, req.body);
    logger.info("Controller - updateJoke: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - updateJoke: Error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const approveJoke = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info(`Controller - approveJoke: Start - ID: ${id}`);

  try {
    const response = await approveJokeService(id);
    logger.info("Controller - approveJoke: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - approveJoke: Error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const rejectJoke = async (req: Request, res: Response) => {
  logger.info("Controller - rejectJoke: Start", { id: req.params.id });

  try {
    const response = await rejectJokeService(req.params.id);
    logger.info("Controller - rejectJoke: Success", { response });
    return res.status(response.code).send(response);
  } catch (error: any) {
    logger.error("Controller - rejectJoke: Error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  }
};
