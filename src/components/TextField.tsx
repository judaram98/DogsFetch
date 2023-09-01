interface TextFieldProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const TextField = ({
  type,
  id,
  placeholder,
  value,
  setValue,
}: TextFieldProps) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="px-3 border border-neutral-300 text-neutral-300 font-normal rounded-lg h-10 outline-[#FBA819] w-full"
      required
    />
  );
};

export default TextField;
