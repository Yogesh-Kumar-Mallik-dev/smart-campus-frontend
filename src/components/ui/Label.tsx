import type { LabelHTMLAttributes } from "react";
import clsx from "clsx";

const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
      <label
          className={clsx(
              "text-sm font-medium text-text block mb-1",
              className
          )}
          {...props}
      />
  );
};

export default Label;