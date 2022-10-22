import { inferProcedureInput } from "@trpc/server";

import { createContextInner } from "../../context";
import { AppRouter, appRouter } from "../_app";

const input: inferProcedureInput<AppRouter["activity"]["add"]> = {
  name: "hello test",
  category: {
    name: "test category",
  },
  location: "test location",
};

test("add and get activity", async () => {
  const ctx = await createContextInner({
    session: null,
  });
  const caller = appRouter.createCaller(ctx);

  const newActivity = await caller.activity.add(input);
  const getActivity = await caller.activity.get(newActivity.id);

  const activityData = {
    id: getActivity.id,
    name: getActivity.name,
    location: getActivity.location,
    category: getActivity.category,
  };

  expect(activityData).toMatchObject(input);
});

test("add and update activity", async () => {
  const ctx = await createContextInner({
    session: null,
  });
  const caller = appRouter.createCaller(ctx);

  const newActivity = await caller.activity.add(input);
  const updatedActivity = await caller.activity.update({
    id: newActivity.id,
    name: "hello updated",
    location: newActivity.location,
    category: newActivity.category,
  });

  expect(updatedActivity.name).toEqual("hello updated");
});

test("add and delete activity", async () => {
  const ctx = await createContextInner({
    session: null,
  });
  const caller = appRouter.createCaller(ctx);

  const newActivity = await caller.activity.add(input);
  const existingActivities = await caller.activity.delete(newActivity.id);
  const existingActivityIds = existingActivities.map((activity) => activity.id);

  expect(existingActivityIds).not.toContain(newActivity.id);
});
