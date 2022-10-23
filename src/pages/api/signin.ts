import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

import { prisma } from "src/server/db/client";
import { userRouter } from "src/server/trpc/router/user";

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const caller = userRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "POST":
      try {
        console.log({ body });
        const { user, account } = await caller.getByCredentials(body);
        setCookie("access_token", account.access_token, {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
        return res.status(200).json(user);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default signin;
