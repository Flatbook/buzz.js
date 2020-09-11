import { setDefaultSchema } from "../src/load-schema";

global.beforeEach(() => {
  setDefaultSchema(null);
});
