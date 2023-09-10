const Label = ({ htmlFor = "username", children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-lg font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
};
export default Label;
