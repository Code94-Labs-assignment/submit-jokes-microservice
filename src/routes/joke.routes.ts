// src/routes/joke.routes.ts
import { Router } from "express";
import {
  submitJoke,
  getAllJokes,
  getJokeTypes,
  createJokeType,
} from "../controller/jokeController";

const jokeRouter = Router();

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Get all jokes
 *     description: Retrieve a list of all jokes.
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: A list of jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60c72b2f4f1a2c001c8e4f34"
 *                   setup:
 *                     type: string
 *                     example: "Why did the chicken cross the road?"
 *                   punchline:
 *                     type: string
 *                     example: "To get to the other side!"
 *                   type:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f4f1a2c001c8e4f34"
 *                       name:
 *                         type: string
 *                         example: "Programming"
 *                   author:
 *                     type: string
 *                     example: "Anonymous"
 */
jokeRouter.get("/", getAllJokes);

/**
 * @swagger
 * /jokes/create:
 *   post:
 *     summary: Submit a new joke
 *     description: Submit a new joke with the provided details.
 *     tags:
 *       - Jokes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               setup:
 *                 type: string
 *                 example: "Why did the chicken cross the road?"
 *               punchline:
 *                 type: string
 *                 example: "To get to the other side!"
 *               type:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f4f1a2c001c8e4f34"
 *                   name:
 *                     type: string
 *                     example: "Programming"
 *               author:
 *                 type: string
 *                 example: "Anonymous"
 *     responses:
 *       201:
 *         description: Joke submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60c72b2f4f1a2c001c8e4f34"
 *                 setup:
 *                   type: string
 *                   example: "Why did the chicken cross the road?"
 *                 punchline:
 *                   type: string
 *                   example: "To get to the other side!"
 *                 type:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f4f1a2c001c8e4f34"
 *                     name:
 *                       type: string
 *                       example: "Programming"
 *                 author:
 *                   type: string
 *                   example: "Anonymous"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
jokeRouter.post("/create", submitJoke);

/**
 * @swagger
 * /jokes/types:
 *   get:
 *     summary: Get all joke types
 *     description: Retrieve a list of all joke types.
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: A list of joke types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f4f1a2c001c8e4f34"
 *                   name:
 *                     type: string
 *                     example: "Programming"
 */
jokeRouter.get("/types", getJokeTypes);

/**
 * @swagger
 * /jokes/types/create:
 *   post:
 *     summary: Create a new joke type
 *     description: Create a new joke type with the provided details.
 *     tags:
 *       - Jokes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Programming"
 *     responses:
 *       201:
 *         description: Joke type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f4f1a2c001c8e4f34"
 *                 name:
 *                   type: string
 *                   example: "Programming"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
jokeRouter.post("/types/create", createJokeType);

export default jokeRouter;
