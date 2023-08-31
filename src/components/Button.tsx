interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value: string;
}

const Button = ({ type, value }: ButtonProps) => {
  return (
    <button
      type={type}
      className="bg-[#FBA819] hover:bg-[#E1981F] text-white py-2 rounded-lg"
    >
      {value}
    </button>
  );
};

export default Button;
