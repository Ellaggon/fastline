const CardPost = ({ id, title, from, to, price, description, category, fono }) => {
  let car;
  const imgs = () => {
    if (category === "bus" || "Bus") {
      car = "../../public/img/bus.png";
    }
    if (category === "van") {
      car = "../../public/img/van.png";
    }
    if (category === "cedan") {
      car = "../../public/img/cedan.jpg";
    }
    if (category === "transfer") {
      car = "../../public/img/transfer.jpg";
    }
  };
  imgs();

  return (
    <article className="flex bg-white cursor-pointer h-64 w-full md:w-4/5 lg:w-3/5 lg:mx-0 mb-3 rounded-lg shadow-xl">
      <figure className="relative w-40 md:w-56 h-full">
        <span className="absolute bottom-3 left-3 bg-white/60 rounded-full text-black text-sm px-2">
          {category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={car}
          alt={category}
        />
      </figure>
      <div className="w-4/5 md:w-3/5 flex flex-col px-3 md:mx-3 justify-center ">
        <span className="text-lg mb-5">{title}</span>

        <span className="text-lg flex justify-evenly">
          <small className="font-thin">Desde:</small>
          {from}
        </span>
        <span className="text-lg flex justify-evenly">
          <small className="font-thin">Destino:</small>
          {to}
        </span>
        <small className="mt-6 md:mt-9 font-thin mb-3">{description}</small>
        <div className="flex justify-between">
          <span className="mt-3 font-extrabold mr-2">$ {price}</span>
          <div className="flex gap-3 mt-3">
          <a href="tel:+56950246702" target="_blank" className="md:font-bold text-sm rounded-lg shadow-md md:px-4 p-1 border hover:border-black text-black">
            Llamar
          </a>
          <a href={`https://wa.me/+${fono}/?text=Hola,%20Estoy%20interesado%20en%20el%20servicio:%20${title}%20desde:%20${from},%20hacia:%20${to}`} target="_blank" className="md:font-bold text-sm rounded-lg shadow-md md:px-4 p-1 hover:bg-black text-white bg-green-600">
            <p>Whatsapp</p>
          </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardPost;
