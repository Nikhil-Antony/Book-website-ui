import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { UserContext } from "../../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/token/`, {
        username: email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        localStorage.setItem("user_data", JSON.stringify(data));
        updateUserData({ type: "LOGIN", payload: data });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        } else {
          if (error.response.data.username === "username") {
            setMessage("email:field is required");
          } else {
            setMessage("email & password field is required");
          }
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Container>
        <LeftContainer>
          <Image src={require("../assets/images/book.jpg")} />
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Login to your Account</LoginHeading>
            <LoginInfo>Enter email and password to login</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputContainer>
              <ButtonContainer>
                <SubmitButton>Login</SubmitButton>
                <LoginButton to="/auth/register/">Signup Now</LoginButton>
                {message && <ErrorMessage>{message}</ErrorMessage>}
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

export default Login;
const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  background-color: #000;
`;
const LeftContainer = styled.div`
  width: 35%;
  padding: 90px;
  
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 10px;
`;

const RightContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  padding: 80px;
`;
const LoginContainer = styled.div`
  padding-bottom: 70px;
  width: 100%;
`;
const LoginHeading = styled.h3`
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
`;
const LoginInfo = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
  color: #fff;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  margin-bottom: 45px;
`;
const TextInput = styled.input`
  padding: 20px 25px 20px 30px;
  width: 90%;
  display: block;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  outline: none;
`;
const LoginButton = styled(Link)`
  display: inline-block;
  border: 2px solid #07fb17;
  transition: background-color 0.5s ease 0s;
  text-decoration: none;
  color: #fff;
  padding: 25px 70px;
  font-weight: bold;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #09f905;
    color: #000;
  }
`;
const SubmitButton = styled.button`
  display: inline-block;
  border: 2px solid #07fb17;
  transition: background-color 0.5s ease 0s;
  color: #fff;
  padding: 25px 40px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: #000;
  &:hover {
    background-color: #09f905;
    color: #000;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ErrorMessage = styled.p`
  font-size: 17px;
  color: red;
  margin-bottom: 25px;
  text-align: center;
`;
