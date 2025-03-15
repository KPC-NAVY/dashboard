import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";


export interface AppSettings {
    position: Record<ElementNames, Pos>,
    addr: string,
}

export type elementNames = ["display", "danger", "internal", "output1", "angle1", "seg7"];
export type ElementNames = elementNames[number];

export type Pos = {
    x?: number,
    y?: number,
    _x?: number,
    _y?: number,
};

const STORAGE_KEY = "AppSettings"
const defaultAppSettings: AppSettings = {
    addr: "localhost:8100",
    position: {
        display: {
            x: 10, y: 10
        },
        danger: {
            x: 165, y: 10
        },
        internal: {
            _x: 10, y: 10
        },
        output1: {
            x: 10, _y: 10
        },
        angle1: {
            x: 165, _y: 10
        },
        seg7: {
            x: 10, y: 60
        },
    }
}
let appSettings: AppSettings;

function initStorage() {
    try {
        throw Error()
        appSettings = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "err")
        if (!("addr" in appSettings) || !("position" in appSettings)) {
            throw Error()
        }
    } catch (_) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAppSettings));
        appSettings = defaultAppSettings;
    }
}

export function getSettings() {
    return appSettings;
}

export function setSetting<T extends keyof AppSettings>(key: T, value: AppSettings[T]) {
    appSettings[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appSettings));
}

export function setPos<T extends ElementNames>(key: T, value: Pos) {
    appSettings.position[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appSettings));
}

export function usePos<T extends ElementNames>(key: T): [Pos, Dispatch<StateUpdater<Pos>>] {
    const [val, setter] = useState(appSettings.position[key] as Pos);
    return [val, (pos: StateUpdater<Pos>) => {
        if (typeof pos === "function") {
            setPos(key, pos(appSettings.position[key]));
        } else {
            setPos(key, pos);
        }
        return setter(pos);
    }];
}

initStorage()