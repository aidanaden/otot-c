import type { NextApiRequest, NextApiResponse } from "next";

import { getCustomAuthSession } from "src/server/common/get-custom-auth-session";

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const customSession = await getCustomAuthSession({ req, res });
        if (!customSession || !customSession.user) {
          return res
            .status(401)
            .json({ statusCode: 401, message: "Unauthorized" });
        }
        return res
          .status(200)
          .json({ statusCode: 200, data: customSession.user });
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default protectedRoute;
