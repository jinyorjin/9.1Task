import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password");
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
      alert("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Logout failed");
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={2} centered relaxed="very" stackable>
        <GridColumn>
          {user ? (
            <div>
              <p>Welcome, {user.email}</p>
              <Button onClick={handleLogout} content="Logout" secondary />
            </div>
          ) : (
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
          )}
          <Divider />
          {!user && <Button as={Link} to="/signup" content="Sign up" basic />}
        </GridColumn>
      </Grid>
    </Segment>
  );
};
export default Login;
