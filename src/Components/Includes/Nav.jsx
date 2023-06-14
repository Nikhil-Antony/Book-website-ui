import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";

function Nav() {
  const { userData, updateUserData } = useContext(UserContext);
  const handleLogout = () => {
    updateUserData({ type: "LOGOUT" });
  };
  return (
    <>
      <Container>
        <FlexContainer>
          {userData ? (
            <>
              {" "}
              <Logo>
                <Link to="/home">
                  <Image src={require("../assets/images/123.png")} />
                </Link>
              </Logo>
              
              <Button onClick={() => handleLogout()}>
                <Link to="/auth/login">Logout</Link>
              </Button>
            </>
          ) : (
            <>
              <Logo>
                <Link to="/auth/login/">
                  <Image src={require("../assets/images/123.png")} />
                </Link>
              </Logo>
              <Button>
                {" "}
                <Link to="/auth/login">HOME</Link>
              </Button>
            </>
          )}
        </FlexContainer>
      </Container>
    </>
  );
}


const Container = styled.header`
  padding: 35px 0px;
  background-color: #000;
  height: 80px;
`;
const FlexContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
const Logo = styled.div`
  width: 9%;
  padding-left:30px;
  
`;
const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 50px;
`;

export default Nav;
