import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../hooks/useContext";
import Layout from "./Layout";
import Register from "./Register";
import Login from "./LogIn";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    <Layout>
      <nav className="flex justify-between items-center fixed top-0 z-10 w-full py-4 px-8 bg-white bg-opacity-60 shadow-lg">
        <div className="font-bold text-2xl">
          <NavLink to="/">Fastline</NavLink>
        </div>
        <ul className="flex gap-4">
          {context.user && (
            <li className="py-1 rounded-lg border hover:border-cyan-800 px-3">
              <NavLink to="/my-account">Mi cuenta</NavLink>
            </li>
          )}
          {!context.user && (
            <li className="py-1">
              <Login/>
            </li>
          )}
          {!context.user && (
            <li className="py-1">
              <Register />
            </li>
          )}
          <li>
            <button className="font-bold rounded-lg shadow-md px-4 p-1 bg-cyan-800 hover:bg-slate-950 text-white">
              <NavLink to="/post-page">Publicar</NavLink>
            </button>
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default Navbar;
