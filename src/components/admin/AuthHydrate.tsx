"use client";

import { useEffect } from "react";
import { setAuthToken } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

function finishHydration() {
  const token = useAuthStore.getState().token;
  if (token) {
    setAuthToken(token);
    useAuthStore.setState({ isAuthenticated: true });
  }
  useAuthStore.setState({ hasHydrated: true });
}

export function AuthHydrate() {
  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      finishHydration();
      return;
    }

    const unsub = useAuthStore.persist.onFinishHydration(finishHydration);
    void useAuthStore.persist.rehydrate();

    return unsub;
  }, []);

  return null;
}
