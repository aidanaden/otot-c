import { useState } from "react";

import { PrimaryDialog } from "src/components";
import { ActivityButton } from "./ActivityButton";
import { EditActivityForm } from "./EditActivityForm";
import { FullActivity } from "./types";

const EditFormDialogButton = ({ activity }: { activity: FullActivity }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  return (
    <div>
      <ActivityButton onClick={() => setEditFormOpen(true)}>
        Edit
      </ActivityButton>
      <PrimaryDialog
        title={"Edit activity"}
        description="Update details of activity"
        isOpen={editFormOpen}
        onClose={() => setEditFormOpen(false)}
        autoClose={true}
      >
        <EditActivityForm
          activity={activity}
          onClose={() => setEditFormOpen(false)}
        />
      </PrimaryDialog>
    </div>
  );
};

export { EditFormDialogButton };
