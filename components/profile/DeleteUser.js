import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Delete from "@material-ui/icons/Delete";
import { deleteUser } from "../../lib/api";
import { signoutUser } from "../../lib/auth";
import { useState } from "react";

const DeleteUser = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDeleteUser = () => {
    setDeleting(true);
    deleteUser(user._id)
      .then(() => {
        signoutUser();
      })
      .catch(err => {
        console.log(err);
        setDeleting(false);
      });
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="secondary"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
