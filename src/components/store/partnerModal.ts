import { create } from "zustand";
import { persist } from "zustand/middleware";

type PartnerModalState = {
  isOpen: boolean;
  draft: { name: string; email: string; description: string };
  setOpen: (v: boolean) => void;
  setDraft: (d: Partial<PartnerModalState["draft"]>) => void;
  clearDraft: () => void;
};

export const usePartnerModal = create<PartnerModalState>()(
  persist(
    (set) => ({
      isOpen: false,
      draft: { name: "", email: "", description: "" },
      setOpen: (v) => set({ isOpen: v }),
      setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
      clearDraft: () =>
        set({ draft: { name: "", email: "", description: "" } }),
    }),
    { name: "partner-modal" }
  )
);
