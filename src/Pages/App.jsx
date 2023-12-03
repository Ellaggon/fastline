import { BrowserRouter, useRoutes } from "react-router-dom";
import { CartProvider } from "../hooks/useContext";
import Home from "./Home";
import NotFound from "./NotFound";
import MyAccount from "./MyAccount";
import PostPage from "./PostPage";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/post-page", element: <PostPage /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
