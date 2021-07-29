import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import bgImage from './assets/images/bg-img.png';
import bubble from './assets/images/bubble.svg';
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
		minHeight: '100vh'
	},
	heroText: {
		textAlign: 'center',
		color: 'white',
		marginTop: 30,
		maxWidth: 300
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
		width: '100%',
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
    	fontWeight: 'bold',
    	margin: '40px 0px 0px 350px',
	},
  inputs: {
		marginTop: '.8rem',
		height: '2rem',
		padding: '5px'
  },
  inputContainer: {
    margin: '100px 0px 0px 450px'
  }
}))

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
			<Grid item xs={12} sm={8} md={7} elevation={6}>
      <Box className={classes.buttonHeader}>
				<Box p={1} alignSelf="flex-end" alignItems="center" className={classes.inputContainer}>
						<Button className={classes.noAccBtn}>Don't have an account?</Button>
						<Button color="background" className={classes.accBtn} onClick={() => history.push("/register")} variant="contained">
							Create account
						</Button>
				</Box>

				<Box width="100%" p={10} alignSelf="center">
					<Grid container>
						<Grid item xs>
							<Typography className={classes.welcome} variant="h4">
								Welcome back!
							</Typography>
						</Grid>
					</Grid>
          <form onSubmit={handleLogin} className={classes.form}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  InputProps={{ classes: { input: classes.inputs } }}
                  margin='dense'
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
                InputProps={{ classes: { input: classes.inputs } }}
                margin='dense'
              />
            </FormControl>
            <Grid>
              <Button type="submit" variant="contained" size="large" color="primary" className={classes.lgnButton}>
                Login
              </Button>
            </Grid>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
