import clsx from "clsx";
import { forwardRef } from "react";

const TextInput = forwardRef(
  ({ text, error, className = "", ...rest }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex flex-col ">
          <input
            className={clsx(
              "block px-4 py-2 w-full bg-transparent text-gray-900 rounded-md shadow-sm border border-gray-400 placeholder:text-gray-400 focus:outline-none focus:ring-0",
              className
            )}
            placeholder={text}
            ref={ref}
            {...rest}
          />
        </div>
        {error && <div className="text-red-800 mt-2">{error.message}</div>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
export default TextInput;
