import { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { appFirebase } from "../Helper/Firebase.config";
import CardPost from "../Components/CardPost";
import { CartContext } from "../hooks/useContext";

const Home = () => {
  const db = getFirestore(appFirebase);
  const context = useContext(CartContext)


  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => context.setItem(data));
  }, []);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarioss"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        context.setList(docs);
      } catch (err) {
        console.error(err);
      }
    };
    getLista();
  }, []);

  return (
    <Layout>
      <Navbar />
      <article className="flex flex-col items-center min-w-full">
        <h2 className="text-center my-2">Publicaciones</h2>
        
          {context.list?.map((el) => (
            <CardPost key={el.id} {...el}/>
          ))}
        
      </article>
      {context.item?.map((el) => (
        <Card className="flex-col-reverse" key={el.id} {...el} />
      ))}
    </Layout>
  );
};

export default Home;
