import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const dummyUser = {
      email: "dummy@example.com",
      number: "1234567890",
      name: "Dummy User"
    };
    res.status(201).json(dummyUser);
  } catch (error) {
    res.status(400).send(error);
  }
};