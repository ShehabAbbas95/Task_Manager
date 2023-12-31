import { ReactNode, HTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "submit" | "button";
  color: string;
  // buttonAction?: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

function Button({ color, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-${color}-500 hover:bg-${color}-400 text-white font-bold py-2 px-4 border-b-4 border-${color}-700 hover:border-${color}-500 rounded`}
    >
      {props.children}
    </button>
  );
}

export default Button;
