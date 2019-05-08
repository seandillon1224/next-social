import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Lock from "@material-ui/icons/Lock";
import withStyles from "@material-ui/core/styles/withStyles";
import { signinUser } from "../lib/auth";
import Router from "next/router";

const Signin = ({ classes }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ text: "", openError: false });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    signinUser(user)
      .then(() => {
        setLoading(false);
        Router.push("/");
      })
      .catch(err => showError(err));
    // setLoading(false);
    //   Router.push("/");
    // } catch (err) {
    //   showError(err);
    // }
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
          <Lock />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign In
        </Typography>
        <form onSubmit={e => handleSubmit(e)} className={classes.form}>
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
            Sign{loading && "ing"} In
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
  }
});

export default withStyles(styles)(Signin);
