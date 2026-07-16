import { RouterProvider } from "react-router-dom";

import router from "./router";
import useAuthInitializer from "./hooks/useAuthInitializer";

const App = () => {
  useAuthInitializer();

  return <RouterProvider router={router} />;
};

export default App;
