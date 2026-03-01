"use client";

import { useState } from "react";
import { Fab } from "@/components/fab";
import { TaskCreateSheet } from "@/components/task-create-sheet";

export function MobileTaskFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Fab onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <TaskCreateSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
