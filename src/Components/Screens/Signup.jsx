import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserContext } from "../../App";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/register/`, {
        email,
        password,
        name: name,
      })
      .then((response) => {
        let data = response.data.data;
        console.log(response.data);
        let status_code = response.data.status_code;
        if (status_code === 6000) {
          console.log(status_code);
          localStorage.setItem("user_login_data", JSON.stringify(data));
          updateUserData({ type: "LOGIN", payload: data });
          navigate("/home");
        } else {
          setMessage(response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        if (error.response.status === 500) {
          setMessage("Name,Email and Password:Field is required");
        }
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Signup Page</title>
      </Helmet>

      <Container>
        <LeftContainer>
          <Image src={require("../assets/images/book.jpg")} />
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Register into Account</LoginHeading>
            <LoginInfo>Create and Explore the world of Books</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputContainer>
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
                  style={{ marginBottom: "30px" }}
                />
              </InputContainer>

              <ButtonContainer>
                <SubmitButton>Create an Account</SubmitButton>
                <LoginButton to="/auth/login/">Login Now</LoginButton>
                {message && <ErrorMessage>{message}</ErrorMessage>}
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

export default Signup;
const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  background-color: #000;
`;
const LeftContainer = styled.div`
  width: 40%;
  padding: 80px;
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
  margin-bottom: 15px;
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
