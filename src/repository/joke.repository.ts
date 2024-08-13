import mongoose from "mongoose";
import { Joke, IJoke, JokeStatus } from "../database/models/joke";
import { JokeType, IJokeType } from "../database/models/JokeType";
import logger from "../utils/logger";

export class JokeRepository {
  async createJoke(joke: Partial<IJoke>) {
    logger.info(`Repository - createJoke: Start - ${JSON.stringify(joke)}`);
    try {
      const newJoke = new Joke(joke);
      const savedJoke = await newJoke.save();
      logger.info(
        `Repository - createJoke: Success - ${JSON.stringify({ jokeId: savedJoke._id })}`,
      );
      return savedJoke;
    } catch (error: any) {
      logger.error(`Repository - createJoke: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not create joke");
    }
  }

  async getAllJokes() {
    logger.info("Repository - getAllJokes: Start");
    try {
      const jokes = await Joke.find().populate("type", "name");
      logger.info(
        `Repository - getAllJokes: Success - ${JSON.stringify({ jokes })}`,
      );
      return jokes;
    } catch (error: any) {
      logger.error(`Repository - getAllJokes: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not retrieve jokes");
    }
  }

  async getJokeTypes() {
    logger.info("Repository - getJokeTypes: Start");
    try {
      const jokeTypes = await JokeType.find();
      logger.info(
        `Repository - getJokeTypes: Success - ${JSON.stringify({ jokeTypes })}`,
      );
      return jokeTypes;
    } catch (error: any) {
      logger.error(`Repository - getJokeTypes: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not retrieve joke types");
    }
  }

  async createJokeType(jokeTypeData: Partial<IJokeType>) {
    logger.info(
      `Repository - createJokeType: Start - ${JSON.stringify(jokeTypeData)}`,
    );
    try {
      const newJokeType = new JokeType(jokeTypeData);
      const savedJokeType = await newJokeType.save();
      logger.info(
        `Repository - createJokeType: Success - ${JSON.stringify({ jokeTypeId: savedJokeType._id })}`,
      );
      return savedJokeType;
    } catch (error: any) {
      logger.error(`Repository - createJokeType: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not create joke type");
    }
  }

  async getPendingJokes() {
    logger.info("Repository - getPendingJokes: Start");
    try {
      const pendingJokes = await Joke.find({
        status: JokeStatus.Pending,
      }).populate("type", "name");
      logger.info(
        `Repository - getPendingJokes: Success - ${JSON.stringify({ pendingJokes })}`,
      );
      return pendingJokes;
    } catch (error: any) {
      logger.error(`Repository - getPendingJokes: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not retrieve pending jokes");
    }
  }

  async updateJoke(id: string, jokeData: Partial<IJoke>) {
    logger.info(
      `Repository - updateJoke: Start - ID: ${id}, Data: ${JSON.stringify(jokeData)}`,
    );
    try {
      const updatedJoke = await Joke.findByIdAndUpdate(id, jokeData, {
        new: true,
      });
      if (!updatedJoke) {
        logger.warn(`Repository - updateJoke: Not Found - ID: ${id}`);
        throw new Error("Joke not found");
      }
      logger.info(
        `Repository - updateJoke: Success - ${JSON.stringify({ updatedJoke })}`,
      );
      return updatedJoke;
    } catch (error: any) {
      logger.error(`Repository - updateJoke: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not update joke");
    }
  }

  async approveJoke(id: string) {
    logger.info(`Repository - approveJoke: Start - ID: ${id}`);
    try {
      const approvedJoke = await Joke.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        { status: JokeStatus.Approved },
        { new: true },
      );

      if (!approvedJoke) {
        logger.warn(`Repository - approveJoke: Not Found - ID: ${id}`);
        throw new Error("Joke not found");
      }

      logger.info(
        `Repository - approveJoke: Success - ${JSON.stringify({ approvedJoke })}`,
      );
      return approvedJoke;
    } catch (error: any) {
      logger.error(`Repository - approveJoke: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not approve joke");
    }
  }

  async deleteJoke(id: string) {
    logger.info(`Repository - deleteJoke: Start - ID: ${id}`);
    try {
      const deletedJoke = await Joke.findByIdAndDelete(id);
      if (!deletedJoke) {
        logger.warn(`Repository - deleteJoke: Not Found - ID: ${id}`);
        throw new Error("Joke not found");
      }
      logger.info(
        `Repository - deleteJoke: Success - ${JSON.stringify({ jokeId: id })}`,
      );
      return deletedJoke;
    } catch (error: any) {
      logger.error(`Repository - deleteJoke: Error - ${error.message}`, {
        stack: error.stack,
      });
      throw new Error("Could not delete joke");
    }
  }
}
