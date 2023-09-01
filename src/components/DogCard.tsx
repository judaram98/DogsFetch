interface DogCardProps {
  img: string;
  name: string;
  age: number;
  zip: number;
  breed: string;
}

const DogCard = ({ img, name, age, zip, breed }: DogCardProps) => {
  return (
    <div className="w-1/6 border rounded-lg p-1 relative">
      <img
        src={img}
        alt="Name"
        className="rounded-md object-cover w-full h-60"
      />
      <p className=" mt-2 px-2 font-bold text-xl">{name}</p>
      <div className="flex justify-between items-center -mt-1 px-2">
        <p className="text-gray-400">{age} Years</p>
        <p className="text-xs font-light text-gray-400">{zip}</p>
      </div>
      <div className="absolute top-3 right-3 py-1 px-3 font-light text-xs rounded-md text-white bg-[#300C39]">
        {breed}
      </div>
    </div>
  );
};

export default DogCard;
