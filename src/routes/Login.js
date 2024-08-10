import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilis/firebase";
import {
  GridColumn,
  FormInput,
  Button,
  Form,
  Grid,
  Segment,
  Divider,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authentication을 사용하여 로그인 시도
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential);

      // 로그인 성공 시 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={2} centered relaxed="very" stackable>
        <GridColumn>
          <Form onSubmit={handleLogin}>
            <FormInput
              icon="user"
              iconPosition="center"
              label="Your email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              icon="lock"
              iconPosition="center"
              label="Your Password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" content="Login" primary />
          </Form>
          <Divider />
          <Button as={Link} to="/signup" content="Sign up" basic />
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default Login;
