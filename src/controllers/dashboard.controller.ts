import type { Request, Response } from "express";
import Lead from "../models/Lead.js";

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [totalLeads, newLeads, qualifiedLeads, convertedLeads] =
      await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ createdAt: { $gte: startOfDay } }),
        Lead.countDocuments({ stage: "Qualified" }),
        Lead.countDocuments({ status: "Converted" }),
      ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard analytics retrieved successfully!",
      data: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        convertedLeads,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
