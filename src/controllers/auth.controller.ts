import type { Request, Response } from "express";
import SignupSchema from "../validators/signupSchema.js";
import z from "zod";
import User from "../models/User.js";
import { hashValue, verifyHash } from "../utils/hash.js";
import { AUTH_TOKEN } from "../constants/index.js";
import { cookieOptions } from "../constants/cookie.js";
import { generateAuthToken } from "../utils/token.js";
import LoginSchema from "../validators/loginSchema.js";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = SignupSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      const tree = z.treeifyError(result.error);

      if (tree.properties) {
        for (const key of Object.keys(tree.properties) as Array<
          keyof typeof tree.properties
        >) {
          errors[key] = tree.properties[key]?.errors?.[0] ?? "Invalid value";
        }
      }

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    const { name, email, password } = result.data;
    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });

    const hashedPassword = await hashValue(password, 10);

    const user = new User({
      name,
      email,
      role: "user",
      password: hashedPassword,
    });
    const savedUser: User = await user.save();

    const token = generateAuthToken({
      email,
      id: savedUser._id,
    });

    return res.status(201).cookie(AUTH_TOKEN, token, cookieOptions).json({
      success: true,
      message: "Your account has been created!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = LoginSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      const tree = z.treeifyError(result.error);

      if (tree.properties) {
        for (const key of Object.keys(tree.properties) as Array<
          keyof typeof tree.properties
        >) {
          errors[key] = tree.properties[key]?.errors?.[0] ?? "Invalid value";
        }
      }

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    const { email, password } = result.data;
    const user: User | null = await User.findOne({ email });

    if (!user || !user.password)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });

    const verify = await verifyHash(password, user.password);
    if (!verify)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });

    const token = generateAuthToken({
      email,
      id: user._id,
    });

    return res.status(200).cookie(AUTH_TOKEN, token, cookieOptions).json({
      success: true,
      message: "Logged in successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
