import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FaceTwoTone from "@material-ui/icons/FaceTwoTone";
import EditSharp from "@material-ui/icons/EditSharp";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";
import { useState, useEffect } from "react";
import { getAuthUser } from "../lib/api";

const EditProfile = ({ auth, classes }) => {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    about: "",
    avatar: "",
    loading: false
  });
  const [avatarPreview, setPreview] = useState("");
  let formData;

  useEffect(() => {
    formData = new FormData();
    setUserData({ ...userData, loading: true });
    const getUser = async () => {
      await getAuthUser(auth.user._id)
        .then(data => {
          setUserData({ ...data, loading: false });
        })
        .catch(err => console.log(err));
    };
    getUser();
  }, []);

  const handleChange = e => {
    let inputValue;
    if (event.target.name === "avatar") {
      inputValue = event.target.files[0];
      setPreview(createPreviewImage(inputValue));
    } else {
      inputValue = event.target.value;
    }
    formData.set(event.target.name, inputValue);
    setUserData({ ...userData, [event.target.name]: inputValue });
  };

  const createPreviewImage = file => {
    URL.createObjectURL(file);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditSharp />
        </Avatar>
        <Typography variant="h5" component="h1">
          Edit Profile
        </Typography>
        <form className={classes.form}>
          {userData.loading ? (
            <Avatar className={classes.bigAvatar}>
              <FaceTwoTone />
            </Avatar>
          ) : (
            <Avatar
              src={avatarPreview || userData.avatar}
              className={classes.bigAvatar}
            />
          )}
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleChange}
            className={classes.input}
          />
          <label htmlFor="avatar" className={classes.uploadButton}>
            <Button variant="contained" color="secondary" component="span">
              Upload Image <CloudUpload />
            </Button>
          </label>
          <span className={classes.filename}>
            {userData.avatar && userData.avatar.name}{" "}
          </span>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">About</InputLabel>
            <Input
              type="text"
              name="about"
              value={userData.about}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Name</InputLabel>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={userData.loading}
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.25em"
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
  },
  input: {
    display: "none"
  }
});

EditProfile.getInitialProps = authInitialProps(true);

export default withStyles(styles)(EditProfile);
