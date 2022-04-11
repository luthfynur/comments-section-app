export default function Button({
  text,
  type,
  onClick,
  position = '',
  disabled,
  loading,
}) {
  return (
    <button
      className={`bg-moderateBlue font-rubik p-2 text-white rounded-lg hover:opacity-60 ${position} ${
        disabled ? 'opacity-70 pointer-events-none' : ''
      } w-fit h-fit ${loading ? 'animate-pulse' : ''}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
