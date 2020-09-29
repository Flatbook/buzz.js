import React from "react";
import gql from "graphql-tag";

import { useQuery } from "@apollo/client";

const SimpleQueryComponent = (): JSX.Element => {
  const query = gql`
    query TestQuery($id: ID!) {
      helloWithArgs(id: $id) {
        id
        hello
        message
      }
    }
  `;

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: "test-input-id",
    },
  });

  if (data) {
    const { message, id } = data.helloWithArgs;
    return (
      <>
        <div>ID: {id}</div>
        {message && <div>Message: {message}</div>}
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }
};

export default SimpleQueryComponent;
