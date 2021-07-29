import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import bgImage from './assets/images/bg-img.png';
import bubble from './assets/images/bubble.svg';
import Hidden from '@material-ui/core/Hidden';
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
		minHeight: '100vh',
		'& .MuiInput-underline:before': {
			borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)'
		}
	},
	heroText: {
		textAlign: 'center',
		color: 'white',
		marginTop: 30,
		maxWidth: 300
  },
  headerText: {
    fontSize: 15
  },
	overlay: {
		backgroundImage: 'linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		flexDirection: 'column',
		minHeight: '100vh',
		paddingBottom: 145,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		backgroundImage: `url(${bgImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
  },
  form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: 1
	},
	accBtn: {
		width: 170,
		height: 54,
		borderRadius: 5,
		filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
		backgroundColor: '#FFFFFF',
		color: 'blue',
		boxShadow: 'none',
		marginRight: 35
  },
  lgnButton: {
		margin: 3,
		padding: 10,
		width: 160,
		height: 56,
		borderRadius: 3,
		marginTop: 49,
		fontWeight: 'bold'
	},
  inputs: {
		marginTop: '.8rem',
		height: '2rem',
		padding: '5px'
  },
  inputContainer: {
    margin: '100px 0px 0px 380px'
  },
  formContainer: {
    width: '90%'
  },
  submitbtn: {
    margin: '40px 0px 0px 350px',
    width: '200px',
    height: '50px'
  }
}))

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={5} className={classes.image}>
				<Box className={classes.overlay}>
					<Hidden xsDown>
						<img
							width={67}
							src={bubble}
						/>
						<Hidden smDown>
							<Typography className={classes.heroText} variant="h4">
								Converse with anyone with any language
							</Typography>
						</Hidden>
					</Hidden>
				</Box>
			</Grid>
			<Grid item xs={12} sm={8} md={7} elevation={6} square>
      <Box className={classes.buttonHeader}>
				<Box p={1} alignSelf="flex-end" alignItems="center" className={classes.inputContainer}>
						<Button className={classes.headerText}>Already have an account?</Button>
						<Button color="background" className={classes.accBtn} onClick={() => history.push("/login")} variant="contained">
							Login
						</Button>
				</Box>

				<Box width="100%"  p={6} alignSelf="center">
					<Grid container>
						<Grid item xs>
							<Typography className={classes.welcome} variant="h4">
								Create an account.
							</Typography>
						</Grid>
					</Grid>
          <form onSubmit={handleRegister}>
           <Grid>
             <Grid>
               <FormControl className={classes.formContainer}>
                 <TextField
                aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                  margin="dense"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.formContainer}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                  margin="dense"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formContainer}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  margin="dense"
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formContainer}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  margin="dense"
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button type="submit" variant="contained" color="primary" size="large" className={classes.submitbtn}>
              Create
            </Button>
          </Grid>
        </form>
				</Box>
				<Box p={1} alignSelf="center" />
			</Box>
			</Grid>
		</Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
