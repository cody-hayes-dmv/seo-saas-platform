import { create } from "zustand";
import api from "../utils/api";

type Branding = {
  id: string;
  name: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  contactEmail?: string;
  contactPhone?: string;
};
type State = { branding?: Branding; load: (agencyId: string) => Promise<void> };
export const useBranding = create<State>((set) => ({
  branding: undefined,
  load: async (agencyId: string) => {
    const { data } = await api.get(`/branding/${agencyId}`);
    set({ branding: data });
  },
}));
