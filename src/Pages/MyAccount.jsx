import { CartContext, useAuth } from "../hooks/useContext";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { appFirebase } from "../Helper/Firebase.config";
import { useContext } from "react";
import CardPost from "../Components/CardPost";

const MyAccount = () => {
  const auth = useAuth();
  const db = getFirestore(appFirebase);
  const { email, uid } = auth.user;
  const context = useContext(CartContext)

  const userDocRef = getDocs(collection(db, "usuarioss"))
  // console.log(userDocRef)
  // console.log(auth.user)


  const handleLogout = () => {
    auth.logout();
  };
  
  return (
    <Layout>
      <Navbar />

      <h1>MY ACCOUNT</h1>
      <h3>{email}</h3>
      {
        context.list?.map((el) => (
          (
            el.uid === uid && <p key={el.id}>{el.title}</p> 
          )
          ))}
      <button
        className="px-4 py-2 bg-red-900 text-white rounded-full hover:bg-black mt-10 shadow-md"
        onClick={() => handleLogout()}
      >
        Log Out
      </button>
    </Layout>
  );
};

export default MyAccount;
