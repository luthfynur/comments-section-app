export default function Input({
  onChange,
  name = '',
  placeholder = '',
  type = '',
  error,
}) {
  return (
    <input
      placeholder={placeholder}
      className={`bg-lightGray w-full border-2 border-solid rounded-lg text-darkBlue p-2 hover:border-black
        ${error ? 'border-red-500' : 'border-moderateBlue'}`}
      onChange={onChange}
      name={name}
      type={type}
    />
  );
}
