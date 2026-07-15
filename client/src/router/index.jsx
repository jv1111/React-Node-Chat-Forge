import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./auth.routes";
import { appRoutes } from "./app.routes";

const router = createBrowserRouter([authRoutes, appRoutes]);

export default router;
