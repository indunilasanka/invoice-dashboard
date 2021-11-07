import styled from "styled-components";
import * as React from "react";

import {Button, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e6ddc4;
  padding: 30px 0;
  .form {
    display: flex;
    flex-direction: column;
    width: 400px;
  }
  .buttonContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item {
    margin: 20px 0;
  }
  .button {
    margin: 5px 0;
    width: 100%;
  }
  a {
    diplay: block;
    width: 100% !important;
    text-decoration: none;
  }
  @media only screen and (max-width: 600px) {
    .form {
      width: 90%;
    }
  }
`;

const SignIn = () => {
    return (
        <Wrapper>
            <Typography variant="h3" color="primary">
                SignIn Page
            </Typography>
            <form className="form">
                <TextField label="User Name" variant="outlined" className="item"/>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    className="item"
                    type="password"
                />{" "}
                <Link to="/invoice">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="item  button"
                    >
                        SignIn
                    </Button>
                </Link>
                <Link to="/invoice">
                    <Button variant="contained" className="item button">
                        Sign in with google
                    </Button>
                </Link>
            </form>
        </Wrapper>
    );
};
export default SignIn;
