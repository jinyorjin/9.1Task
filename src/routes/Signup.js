import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import {
  GridColumn,
  FormInput,
  Button,
  Form,
  Grid,
  Segment,
  Divider,
} from "semantic-ui-react";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
      });

      console.log("Success!");
      alert("Success!");
      console.log("Navigating to /login");

      navigate("/login");
    } catch (error) {
      console.error("Error signing up: ", error.message);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={2} centered relaxed="very" stackable>
        <GridColumn>
          <Form onSubmit={handleSignup}>
            <h2 style={{ color: "blue", textAlign: "center" }}>
              Create a Deakin Account
            </h2>
            <FormInput
              icon="user"
              iconPosition="center"
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              icon="user"
              iconPosition="center"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              icon="lock"
              iconPosition="center"
              label="Your Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              icon="lock"
              iconPosition="center"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button content="Create" primary />
            <Divider />
          </Form>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default Signup;
