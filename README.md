# 🚀 Buzz.js 🌚

<div style="text-align: center">
<img src="https://img2.thejournal.ie/inline/3477713/original/?width=410&version=3477713">
</img>
</div>

Buzz.js is a simple tool to help you mock GraphQL responses in your components that use Apollo's `useQuery` and `useMutation` hooks.

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

   import { loadSchemaFile, resetMocks, setMocks } from "@sonder/buzz.js";

   beforeAll(() => {
     loadSchemaFile("./schema.graphql"); // Relative path from the root of your workspace

     // Optional: Mock out nonstandard scalar types in your schema
     setMocks({
       RFC3339DateTime: () => moment().format(),
     });
   });

   afterEach(() => {
     resetMocks();
   });
   ```

1. Use it in your tests! Buzz is compatible with any DOM mocking library, including Enzyme and React Testing Library.

### Usage
