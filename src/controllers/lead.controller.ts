import type { Request, Response } from "express";
import Lead from "../models/Lead.js";

export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      search,
      source,
      status,
      stage,
      sortBy = "createdAt",
      order = "asc",
      page = 1,
      limit = 20,
    } = req.query;

    const filter: Record<string, any> = {};
    const sortFilter: Record<string, any> = {};

    if (sortBy && typeof sortBy === "string") {
      if (order) {
        sortFilter[sortBy] = order === "asc" ? 1 : -1;
      } else {
        sortFilter[sortBy] = 1;
      }
    }

    if (search) {
      filter["$or"] = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    if (source) filter.source = source;
    if (status) filter.status = status;
    if (stage) filter.stage = stage;

    const pageNumber = Math.max(1, parseInt(page as string) || 1);
    const pageSize = Math.max(1, parseInt(limit as string) || 20);

    const skip = (pageNumber - 1) * pageSize;

    const leads = await Lead.find(filter)
      .sort(sortFilter)
      .skip(skip)
      .limit(pageSize);

    const totalLeads = await Lead.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Leads retrieved successfully!",
      leads,
      totalLeads,
      totalPages: Math.ceil(totalLeads / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const leadId = req.params.leadId;
    const lead = await Lead.findById(leadId);

    return res.status(200).json({
      success: true,
      message: "Lead retrieved successfully!",
      lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
