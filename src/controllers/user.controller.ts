import type { Request, Response } from "express";
import User from "../models/User.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
