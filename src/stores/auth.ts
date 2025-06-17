// src/stores/auth.js
import type { Session } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

interface IState {
  user: Session["user"] | null;
  session: Session | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    user: null,
    session: null,
    loading: true,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error.message;
      this.session = data.session;
      this.user = data.session?.user ?? null;
      this.loading = false;
    },
    async signInWithEmail(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error.message;
      // await getProfileById(data.user.id).then().catch(async () => {
      //   await this.signOut();
      // });
      this.user = data.user;
      this.session = data.session;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error.message;
      this.user = null;
      this.session = null;
    },
    async updateAuth(session: Session) {
      this.user = session.user as any;
      this.session = session as any;
    },
  },
});
