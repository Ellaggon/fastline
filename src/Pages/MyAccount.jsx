import { AuthContext, useAuth } from "../hooks/useContext";
import { NavLink } from "react-router-dom";
import Layout from "../Components/Layout";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { appFirebase } from "../Helper/firebase.config";
import { useContext } from "react";
import Navbar from "../Components/Navbar";
import OrdersCard from "../Components/Orderscard";
import Loader from "../Components/Loader";

const MyAccount = () => {
  const auth = useAuth();
  // const db = getFirestore(appFirebase);
  const { user, list } = useContext(AuthContext);

  // const userDocRef = getDocs(collection(db, "usuarioss"));
  // console.log(userDocRef)

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Layout>
      <Navbar />

      {user && (
        <div className="flex justify-evenly m-5 w-full">
          <h2 className="text-lg">Publicaciones:</h2>
          <h3 className="text-zinc-400 text-sm">{user.email}</h3>
        </div>
      )}

      {list?.map(
        (el) => el.uid === user.uid && <OrdersCard key={el.id} {...el} />
      )}

      <button
        className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-black mt-10 shadow-md"
        onClick={() => handleLogout()}
      >
        <NavLink to="/">Log Out</NavLink>
      </button>
    </Layout>
  );
};

export default MyAccount;
