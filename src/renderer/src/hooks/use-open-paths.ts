// ============================================================
//  use-open-paths.ts — renderer-side handling of Explorer paths
//  Fork author: M.A. Klyuchenko (Omsk, OmSTU, KZI, IBa-261)
//  Original: xdagiz — https://github.com/xdagiz/xcalidraw
//  Fork version: 0.1.2 (TenebrisHunter/xcalidraw_RightClick)
// ============================================================

// ============================================================
//  use-open-paths.ts — обработка путей из Проводника в UI
//  Форк: Ключенко М.А. (Омск, ОмГТУ, КЗИ, ИБа-261)
//  Оригинал: xdagiz — https://github.com/xdagiz/xcalidraw
//  Версия форка: 0.1.2 (TenebrisHunter/xcalidraw_RightClick)
// ============================================================
import { useEffect } from "react";

import { toast } from "@/components/ui/toast";
import { useStore } from "@/lib/store";

export const useOpenPaths = () => {
  useEffect(() => {
    const off = window.api.app.onOpenPaths(({ outcomes }) => {
      for (const outcome of outcomes) {
        if (outcome.status === "error") {
          toast.add({
            id: `open-path-error:${outcome.name}`,
            title: `Couldn’t open “${outcome.name}”`,
            description: outcome.message,
            type: "error",
          });
        } else if (outcome.status === "root") {
          toast.add({
            id: `open-path-root:${outcome.root}`,
            title: "Drawings folder switched",
            description: outcome.root,
            type: "success",
          });
        }
      }
      const opened = outcomes.find((outcome) => outcome.status === "open");
      if (opened?.status === "open") {
        void useStore.getState().openFileWhenReady(opened.id, opened.root);
      }
    });
    void window.api.app.flushOpenPaths().catch(() => undefined);
    return off;
  }, []);
};