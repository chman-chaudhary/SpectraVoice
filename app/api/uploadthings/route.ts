import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

console.log("In Route.ts");
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
