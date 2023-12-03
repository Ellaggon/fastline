

const CardPost = ({id, title, from, to, price, description, category}) => {
  let car;
  const imgs = () => {
    if(category === "bus" || "Bus"){
      car = "../../public/img/bus.png";
    } if(category === "van"){
      car = "../../public/img/van.png"
    } if(category === "cedan"){
      car = "../../public/img/cedan.jpg"
    } if(category === "transfer"){
      car = "../../public/img/transfer.jpg"
    }
  };
  imgs();

  return (
    <article className="flex bg-white cursor-pointer lg:w-3/5 h-64 mx-3 lg:mx-0 mb-3 rounded-lg shadow-xl">
      <figure className="relative w-40 md:w-56 h-full">
        <span className="absolute bottom-3 left-3 bg-white/60 rounded-full text-black text-sm px-2">
          { category }
        </span>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={car}
            alt={ category }
          />
      </figure>
      <p className="w-4/5 md:w-3/5 flex flex-col mx-2 md:mx-3 justify-center ">
      <span className="font-bold text-lg text-center mb-1">{ title }</span>
        <small className="font-thin">Desde:</small>
        <span className="text-lg text-center">{ from }</span>
        <small className="font-thin">Destino:</small>
        <span className=" text-lg text-center">{ to }</span>
        <small className="mt-6 md:mt-9 font-thin">{ description }</small>
        <span className="mt-3 font-extrabold text-end mr-2">$ { price }</span>
      </p>
    </article>
  );
};

export default CardPost;
