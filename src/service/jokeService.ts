import { JokeRepository } from "../repository/joke.repository";
import { responseFormate } from "../models/response";
import { IJoke } from "../database/models/joke";
import { IJokeType } from "../database/models/JokeType";

const jokeRepo = new JokeRepository();

export const submitJokeService = async (
  jokeData: Partial<IJoke>,
): Promise<responseFormate> => {
  try {
    const newJoke = await jokeRepo.createJoke(jokeData);
    return {
      code: 201,
      data: newJoke,
      message: "Joke submitted successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error submitting joke",
      error: error.message,
    };
  }
};

export const getAllJokesService = async (): Promise<responseFormate> => {
  try {
    const jokes = await jokeRepo.getAllJokes();
    return { code: 200, data: jokes, message: "Jokes fetched successfully." };
  } catch (error: any) {
    return { code: 500, message: "Error fetching jokes", error: error.message };
  }
};

export const getJokeTypesService = async (): Promise<responseFormate> => {
  try {
    const jokeTypes = await jokeRepo.getJokeTypes();
    return {
      code: 200,
      data: jokeTypes,
      message: "Joke types fetched successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching joke types",
      error: error.message,
    };
  }
};

export const createJokeTypeService = async (
  jokeTypeData: Partial<IJokeType>,
): Promise<responseFormate> => {
  try {
    const newJokeType = await jokeRepo.createJokeType(jokeTypeData);
    return {
      code: 201,
      data: newJokeType,
      message: "Joke type created successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error creating joke type",
      error: error.message,
    };
  }
};

export const getPendingJokesService = async (): Promise<responseFormate> => {
  try {
    const pendingJokes = await jokeRepo.getPendingJokes(); // Implement this method in the repository
    return {
      code: 200,
      data: pendingJokes,
      message: "Pending jokes fetched successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching pending jokes",
      error: error.message,
    };
  }
};

export const updateJokeService = async (
  id: string,
  jokeData: Partial<IJoke>,
): Promise<responseFormate> => {
  try {
    const updatedJoke = await jokeRepo.updateJoke(id, jokeData); // Implement this method in the repository
    return {
      code: 200,
      data: updatedJoke,
      message: "Joke updated successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error updating joke",
      error: error.message,
    };
  }
};

export const approveJokeService = async (
  id: string,
): Promise<responseFormate> => {
  try {
    const approvedJoke = await jokeRepo.approveJoke(id); // Implement this method in the repository
    return {
      code: 200,
      data: approvedJoke,
      message: "Joke approved successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error approving joke",
      error: error.message,
    };
  }
};

export const rejectJokeService = async (
  id: string,
): Promise<responseFormate> => {
  try {
    await jokeRepo.deleteJoke(id); // Implement this method in the repository to delete the joke
    return {
      code: 200,
      message: "Joke rejected and deleted successfully.",
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error rejecting joke",
      error: error.message,
    };
  }
};
