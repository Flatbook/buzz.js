import React from "react";
import gql from "graphql-tag";

import { useMutation } from "@apollo/client";

const SimpleMutationComponent = (): JSX.Element => {
  const mutation = gql`
    mutation TestMutation($id: ID!) {
      helloWithArgsMutation(id: $id) {
        id
      }
    }
  `;

  const [mutate] = useMutation(mutation);

  const handleClick = () => {
    mutate({
      variables: {
        id: "example-id",
      },
    });
  };

  return <button onClick={handleClick}>mutate!</button>;
};

export default SimpleMutationComponent;
