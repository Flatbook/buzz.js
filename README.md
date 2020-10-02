# 🚀 Buzz.js 🌚

<div style="text-align: center">
<img src="https://img2.thejournal.ie/inline/3477713/original/?width=410&version=3477713">
</img>
</div>

Buzz.js is a simple tool to help you mock GraphQL responses in your components that use Apollo's `useQuery` and `useMutation` hooks.

With Buzz, there is _no mocking overhead_ when mocking responses. Buzz will automatically generate a response with types that align to your schema, and make it easy for you to override specific peices when you need to. And everything is synchronous, so there's no need to add `sleep`s to your code.

## Installation

1. Install buzz

   ```bash
   $ yarn add -D @sonder/buzz.js
   ```

1. Update your jest configuration to add a setup file to `setupFilesAfterEnv`

   ```json
   // package.json
   ...
   "jest": {
       "setupFilesAfterEnv": [
           "jest/buzz.js" // 👈 add this
       ]
   }
   ```

1. Load your local schema file onto the spaceship:

   ```javascript
   // jest/buzz.js
   import moment from "moment";

   import { loadSchemaFile, setMocks } from "@sonder/buzz.js";

   beforeAll(() => {
     loadSchemaFile("./schema.graphql"); // Relative path from the root of your workspace

     // Optional: Mock out nonstandard scalar types in your schema
     setMocks({
       RFC3339DateTime: () => moment().format(),
     });
   });
   ```

1. Use it in your tests! Buzz is compatible with any DOM mocking library, including Enzyme and React Testing Library.

### Usage

Let's say that we have a graphql schema that looks like this:

```graphql
type HelloResponse {
  id: ID!
  hello: Boolean
  message: String
}

type Mutation {
  helloMutation: HelloResponse!
}

type Query {
  hello: HelloResponse!
  helloWithArgs(id: ID!): HelloResponse!
}
```

and a component that makes a request against this query:

```typescript
const { useQuery } from '@apollo/client';

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
```

We can write our test like the following example:

```typescript
import { mockUseQuery, restoreMocks } from "@sonder/buzz.js";

import { TestQuery, TestQueryVariables } from "../generated-types";
import { SimpleComponent } from "../app";

describe("SimpleComponent", () => {
  /**
   * 👈 important! Add this afterAll block to each describe block where mockQuery or mockMutation is used
   */
  afterAll(() => {
    restoreMocks();
  });

  it("mocks the response with no mocking overhead", () => {
    // if you are using typescript, and have generated types, pass the query and variable types
    mockUseQuery<TestQuery, TestQueryVariables>("TestQuery");

    const { getByText } = render(<SimpleQueryComponent />);
    expect(getByText(/^ID: example-id$/).textContent).not.toBeNull();
  });
});
```

`mockUseQuery` and `mockUseMutation` both return validators which you can use to make assertions that your components execute the correct request

```typescript
describe("SimpleComponent", () => {
  it("mocks the response with no mocking overhead", () => {
    const validator = mockUseQuery<TestQuery, TestQueryVariables>("TestQuery");

    const { getByText } = render(<SimpleQueryComponent />);

    expect(validator.getCalls().length).toEqual(1);
    expect(validator.getCalls()[0].options.variables?.id).toEqual("test-id");
  });
});
```

Need to customize the response? No problem:

```typescript
describe("SimpleComponent", () => {
  it("mocks the response with simple overrides", () => {
    mockUseQuery<TesQuery, TestQueryVariables>("TestQuery", {
      response: {
        helloWithArgs: {
          // Pass in a partial response to be merged with the mock
          message: null,
        },
      },
    });

    const { getByText } = render(<SimpleQueryComponent />);
    expect(getByText(/^ID: example-id$/).textContent).not.toBeNull();
  });
});
```

Need to mock loading or error states? Buzz can do that:

```typescript
import { ApolloError } from "@apollo/client";
import { SimpleComponent } from "../app";

describe("SimpleComponent", () => {
  it("displays a loading indicator", () => {
    mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
      loading: true,
    });

    const { queryByText } = render(<SimpleQueryComponent />);
    expect(queryByText(/^Loading\.\.\.$/).textContent).not.toBeNull();
    expect(queryByText(/^ID .*$/)).toBeNull();
  });

  it("displays an error message", () => {
    mockUseQuery<TestQueryVariables>("TestQuery", {
      error: new ApolloError({ errorMessage: "test-error" }),
    });

    const { getByTestId } = render(<SimpleQueryComponent />);
    expect(queryByText(/^Error: test-error$/).textContent).not.toBeNull();
  });
});
```

### API

For more info, check out the [API docs](./docs/generated).

### Caveats

Buzz.js is only compatible with Apollo's hook functions `useQuery`, and `useMutation`. It is not compatible with Apollo HOCs or component integration types.
