import type { ReactNode } from "react";
import clsx from "clsx";
import Button from "@components/ui/Buttons";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

const EmptyState = ({title, description, actionLabel, onAction, icon, className,}: EmptyStateProps) => {
  return (
      <div
          className={clsx(
              "flex flex-col items-center justify-center text-center py-16 px-6",
              className
          )}
      >
        {icon && <div className="mb-4 text-text-muted">{icon}</div>}

        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {description && (
            <p className="text-sm text-text-muted max-w-sm mb-6">
              {description}
            </p>
        )}

        {actionLabel && onAction && (
            <Button variant="primary" intent="fill" onClick={onAction}>
              {actionLabel}
            </Button>
        )}
      </div>
  );
};

export default EmptyState;