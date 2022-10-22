import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import { activityRouter } from "src/server/trpc/router/activity";

const activity = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    body,
  } = req;
  const caller = activityRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "GET":
      try {
        const activity = await caller.get(id as string);
        return res.status(200).json(activity);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    case "PUT" || "PATCH":
      try {
        const updatedActivity = await caller.update({
          ...body,
          id: id as string,
        });
        return res.status(200).json(updatedActivity);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    case "DELETE":
      try {
        const deletedActivity = await caller.delete(id as string);
        return res.status(200).json(deletedActivity);
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
