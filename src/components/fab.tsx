"use client";

type FabProps = {
  onClick: () => void;
  isOpen?: boolean;
};

export function Fab({ onClick, isOpen }: FabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95 md:hidden"
      aria-label="タスクを追加"
    >
      <svg
        className={`h-7 w-7 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}
