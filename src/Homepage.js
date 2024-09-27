import React from "react";
import {
  Grid,
  Header as SemanticHeader,
  Input,
  Button,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PricingPlanPage from "./routes/PricingPlanPage";

const HomePage = () => (
  <Segment style={{ backgroundColor: "#f2f2f2", border: "none" }}>
    <Grid padded>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={4}>
          <SemanticHeader as="h1" style={{ color: "grey" }}>
            DEV@Deakin
          </SemanticHeader>
        </Grid.Column>
        <Grid.Column width={8}>
          <Input
            icon="search"
            placeholder="Search..."
            fluid
            style={{ backgroundColor: "#fff" }}
          />
        </Grid.Column>
        <Grid.Column width={4} textAlign="right">
          <Button as={Link} to="/signup" basic style={{ color: "grey" }}>
            Post
          </Button>
          <Button as={Link} to="/login" basic style={{ color: "grey" }}>
            Login
          </Button>
          <Button
            as={Link}
            to="/PricingPlanPage"
            basic
            style={{ color: "grey" }}
          >
            PricePlan
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default HomePage;
