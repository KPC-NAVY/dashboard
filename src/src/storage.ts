import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import { create } from "./tools.ts";

export interface AppSettings {
  position: Record<ElementNames, Pos>;
  addr: string;
}

export type elementNames = [
  "head",
  "internal",
  "take_off",
  "output1",
  "angle1",
  "seg7",
  "_popup1",
];
export type ElementNames = elementNames[number];

export type Pos = {
  x?: number;
  y?: number;
  _x?: number;
  _y?: number;
};

const STORAGE_KEY = "AppSettings";
const defaultAppSettings: AppSettings = {
  addr: "localhost:8100",
  position: {
    head: {
      x: 10,
      y: 10,
    },
    internal: {
      _x: 10,
      y: 10,
    },
    take_off: {
      _x: 10,
      _y: 10,
    },
    output1: {
      x: 10,
      _y: 10,
    },
    angle1: {
      x: 165,
      _y: 10,
    },
    seg7: {
      x: 10,
      y: 60,
    },
    _popup1: {
      x: 200,
      y: 200,
    },
  },
};
let appSettings: AppSettings;

function initStorage() {
  try {
    throw Error();
    appSettings = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "err");
    if (!("addr" in appSettings) || !("position" in appSettings)) {
      throw Error();
    }
  } catch (_) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAppSettings));
    appSettings = defaultAppSettings;
  }
}

export function getSettings() {
  return appSettings;
}

export function setSetting<T extends keyof AppSettings>(
  key: T,
  value: AppSettings[T],
) {
  appSettings[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appSettings));
}

export function setPos(key: ElementNames, value: Pos) {
  appSettings.position[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appSettings));
}

const dispatches: Record<ElementNames, Dispatch<StateUpdater<Pos>>[]> = create([
  "head",
  "internal",
  "take_off",
  "output1",
  "angle1",
  "seg7",
  "_popup1",
], []);

export function usePos(key: ElementNames): [Pos, Dispatch<StateUpdater<Pos>>] {
  const [val, dispatch] = useState(appSettings.position[key]);
  dispatches[key].push(dispatch);
  return [val, dispatch];
}

initStorage();
