interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value: string;
  selected: boolean;
}

const Button = ({ type, value, selected }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`text-white py-2 rounded-lg w-full ${
        selected
          ? "bg-[#FBA819] hover:bg-[#E1981F]"
          : "border border-neutral-300 text-neutral-300"
      }`}
    >
      {value}
    </button>
  );
};

export default Button;
