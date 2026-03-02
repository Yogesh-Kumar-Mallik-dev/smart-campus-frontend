import type { ReactNode } from "react";
import Label from "./Label";

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

const FormField = ({ label, htmlFor, error, children }: FormFieldProps) => {
  return (
      <div className="space-y-1">
        {label && <Label htmlFor={htmlFor}>{label}</Label>}

        {children}

        {error && (
            <p className="text-xs text-error mt-1">{error}</p>
        )}
      </div>
  );
};

export default FormField;