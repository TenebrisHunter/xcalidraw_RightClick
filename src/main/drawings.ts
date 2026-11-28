// ============================================================
//  drawings.ts — folder selection and switching for drawings
//  Fork author: M.A. Klyuchenko (Omsk, OmSTU, KZI, IBa-261)
//  Original: xdagiz — https://github.com/xdagiz/xcalidraw
//  Fork version: 0.1.2 (TenebrisHunter/xcalidraw_RightClick)
// ============================================================

// ============================================================
//  drawings.ts — выбор/переключение папки с рисунками
//  Форк: Ключенко М.А. (Омск, ОмГТУ, КЗИ, ИБа-261)
//  Оригинал: xdagiz — https://github.com/xdagiz/xcalidraw
//  Версия форка: 0.1.2 (TenebrisHunter/xcalidraw_RightClick)
// ============================================================
import { realpath, stat } from "node:fs/promises";
import { resolve, basename } from "node:path";

import { codedError, errorCodeOf } from "@shared/errors";
import type { DrawingInfo } from "@shared/ipc";
import { app, dialog, type BrowserWindow } from "electron";

import { formatDisplayPath } from "./display-path";
import { countEntriesFlat, MAX_WALK_ENTRIES } from "./files";
import { getDrawingPath, setDrawingPath } from "./store";

export const getDrawings = async (): Promise<DrawingInfo> => {
  const storedPath = getDrawingPath();
  if (!storedPath) {
    return {
      path: null,
      displayPath: null,
      displayName: null,
      configured: false,
      missing: false,
    };
  }

  const resolved = resolve(storedPath);
  const home = app.getPath("home");

  const def: DrawingInfo = {
    path: resolved,
    displayPath: formatDisplayPath(resolved, home),
    displayName: basename(resolved),
    configured: false,
    missing: true,
  };

  try {
    const canonical = await realpath(resolved);
    const stats = await stat(canonical);
    if (!stats.isDirectory()) return def;

    return {
      path: canonical,
      displayPath: formatDisplayPath(canonical, home),
      displayName: basename(canonical),
      configured: true,
      missing: false,
    };
  } catch (error) {
    const code = errorCodeOf(error);
    if (code === "ENOENT" || code === "ENOTDIR") return def;
    throw error;
  }
};

export const pickDrawings = async (win: BrowserWindow | null): Promise<DrawingInfo | null> => {
  const opts: Electron.OpenDialogOptions = {
    title: "Choose your drawings folder",
    properties: ["openDirectory", "createDirectory"],
    defaultPath: app.getPath("documents"),
  };

  const result = win ? await dialog.showOpenDialog(win, opts) : await dialog.showOpenDialog(opts);
  if (result.canceled || result.filePaths.length === 0) return null;

  const chosen = resolve(result.filePaths[0]);
  const stats = await stat(chosen).catch(() => null);
  if (!stats?.isDirectory()) {
    throw codedError(`Not a directory: ${chosen}`, {
      code: "INVALID",
      reason: "invalid-arg",
      field: "path",
    });
  }

  await countEntriesFlat(chosen, MAX_WALK_ENTRIES);

  setDrawingPath(chosen);
  return getDrawings();
};

export const switchDrawings = async (chosen: string): Promise<DrawingInfo> => {
  const resolved = resolve(chosen);
  const stats = await stat(resolved).catch(() => null);
  if (!stats?.isDirectory()) {
    throw codedError(`Not a directory: ${resolved}`, {
      code: "INVALID",
      reason: "invalid-arg",
      field: "path",
    });
  }

  await countEntriesFlat(resolved, MAX_WALK_ENTRIES);

  setDrawingPath(resolved);
  return getDrawings();
};
