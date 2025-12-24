import { ChevronDown } from "lucide-react";

type DropdownProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  panelClassName?: string;
};

export default function Dropdown({
  label,
  children,
  className = "",
  panelClassName = ""
}: DropdownProps) {
  return (
    <details className={`relative ${className}`}>
      <summary
        className={
          "list-none cursor-pointer select-none rounded-none border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
        }
      >
        <span className="inline-flex items-center gap-2">
          {label}
          <ChevronDown className="h-4 w-4" />
        </span>
      </summary>

      <div
        className={`absolute right-0 mt-2 min-w-[12rem] rounded-none border border-line bg-white shadow-card ${panelClassName}`}
      >
        {children}
      </div>
    </details>
  );
}

export function DropdownItem({
  children,
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm text-ink transition hover:bg-sand ${className}`}
    >
      {children}
    </button>
  );
}
