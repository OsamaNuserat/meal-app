import Label from "./Label";

const Group = ({ children }) => {
  return (
    <div className="mt-10">
      <div>{children}</div>
    </div>
  );
};
Group.Label = Label;
export default Group;
