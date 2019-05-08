import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import withStyles from "@material-ui/core/styles/withStyles";
//routes
import { signupUser } from "../lib/auth";
import Link from "next/link";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Signup = ({ classes }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ text: "", openError: false });
  const [createdUser, setCreatedUser] = useState({
    name: "",
    openSuccess: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupUser(user);
      setError({ text: "", openError: false });
      setCreatedUser({ name: res, openSuccess: true });
      setLoading(false);
    } catch (err) {
      showError(err);
    }
  };

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setError({ text: error, openError: true });
    setLoading(false);
  };

  const handleClose = () => {
    setError({ text: "", openError: false });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
        <form onSubmit={e => handleSubmit(e)} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input name="name" type="text" onChange={e => handleChange(e)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" onChange={e => handleChange(e)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              onChange={e => handleChange(e)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign{loading && "ing"} Up
          </Button>
        </form>
        {error.openError && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={error.openError}
            onClose={handleClose}
            autoHideDuration={6000}
            message={<span className={classes.snack}>{error.text}</span>}
          />
        )}
      </Paper>
      <Dialog
        open={createdUser.openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {createdUser.name} successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} color="primary" variant="contained">
            <Link href="/signin">
              <a className={classes.signinLink}>Sign In</a>
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  signinLink: {
    textDecoration: "none",
    color: "white"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.secondary.light
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Signup);
