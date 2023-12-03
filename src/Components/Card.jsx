

const Card = ({id,title, price, images, description, category: { name }}) => {
  return (
    <article className="flex bg-white cursor-pointer lg:w-3/5 h-56 mx-3 lg:mx-0 mb-3 rounded-lg shadow-xl">
      <figure className="relative w-40 md:w-56 h-full">
        <span className="absolute bottom-3 left-3 bg-white/60 rounded-full text-black text-sm px-2">
          { name }
        </span>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={ images }
            alt="Headphones"
          />
      </figure>
      <p className="w-4/5 md:w-3/5 flex flex-col mx-2 md:mx-3 justify-center">
        <span className="font-bold text-lg">{ title }</span>
        <small className="mt-6 md:mt-9 font-thin">{ description }</small>
        <span className="mt-3 font-extrabold">{ price }</span>
      </p>
    </article>
  );
};

export default Card;
