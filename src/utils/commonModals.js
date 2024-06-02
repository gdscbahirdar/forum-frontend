import React from "react";
import { Button, Dialog } from "components/ui";

const UpvoteSVG = () => (
  <svg
    aria-hidden="true"
    className="svg-icon iconArrowUp"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M1 12h16L9 4l-8 8Z"></path>
  </svg>
);

const DownvoteSVG = () => (
  <svg
    aria-hidden="true"
    className="svg-icon iconArrowDown"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M1 6h16l-8 8-8-8Z"></path>
  </svg>
);

const FlagSVG = () => (
  <svg
    aria-hidden="true"
    className="svg-icon iconFlag"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M3 2v14h2v-6h3.6l.4 1h6V3H9.5L9 2H3Z"></path>
  </svg>
);

const DeleteModal = ({
  dialogIsOpen,
  onDialogClose,
  onDelete,
  toBeDeleted
}) => {
  const { id, type } = toBeDeleted;
  return (
    <Dialog
      isOpen={dialogIsOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Delete {type}</h5>
      <p>Are you sure you want to delete this {type}?</p>
      <div className="text-right mt-6">
        <Button
          className="ltr:mr-2 rtl:ml-2"
          variant="plain"
          onClick={onDialogClose}
        >
          Cancel
        </Button>
        <Button variant="solid" color="red" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

export { UpvoteSVG, DownvoteSVG, FlagSVG, DeleteModal };
