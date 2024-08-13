import { Joke, IJoke } from "../database/models/joke";
import { JokeType, IJokeType } from "../database/models/JokeType";

export class JokeRepository {
  async createJoke(joke: Partial<IJoke>) {
    const newJoke = new Joke(joke);
    return newJoke.save();
  }

  async getAllJokes() {
    return Joke.find().populate("type", "name");
  }

  async getJokeTypes() {
    return JokeType.find();
  }

  async createJokeType(jokeTypeData: Partial<IJokeType>) {
    const newJokeType = new JokeType(jokeTypeData);
    return newJokeType.save();
  }

  async getPendingJokes() {
    return Joke.find({ status: "Pending" }).populate("type", "name");
  }

  async updateJoke(id: string, jokeData: Partial<IJoke>) {
    return Joke.findByIdAndUpdate(id, jokeData, { new: true });
  }

  async approveJoke(id: string) {
    return Joke.findByIdAndUpdate(id, { status: "Approved" }, { new: true });
  }

  async deleteJoke(id: string) {
    return Joke.findByIdAndDelete(id);
  }
}
