import { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { appFirebase } from "../Helper/firebase.config"; 
import CardPost from "../Components/CardPost";
import { AuthContext } from "../hooks/useContext";
import Loader from "../Components/Loader";

const Home = () => {
  const db = getFirestore(appFirebase);
  const { item, setItem, list, setList } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarioss"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (err) {
        console.error(err);
      }
    };
    getLista();
  }, []);

  const renderView = () => {
    if (list?.length > 0) {
      return list?.map((el) => <CardPost key={el.id} {...el} />);
    } else {
      return <Loader />;
    }
  };

  return (
    <Layout>
      <Navbar />
      <article className="flex flex-col items-center w-full px-3">
        {
          renderView()
        }
      </article>
      {item?.map((el) => (
        <Card className="flex-col-reverse" key={el.id} {...el} />
      ))}
    </Layout>
  );
};

export default Home;
