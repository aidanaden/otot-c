import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import { activityRouter } from "src/server/trpc/router/activity";

const activity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const caller = activityRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "GET":
      try {
        const activities = await caller.getAll();
        return res.status(200).json(activities);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    case "POST":
      try {
        const newActivity = await caller.add(body);
        return res.status(200).json(newActivity);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default activity;
