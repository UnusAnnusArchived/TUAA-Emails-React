"use client";

import { AtomEffect, atom } from "recoil";
import { getCookie, setCookie } from "cookies-next";

const localStorageEffect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
  try {
    const savedValue = localStorage.getItem(node.key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  } catch (err) {
    // console.error(err);
  }
  onSet((newValue) => {
    try {
      localStorage.setItem(node.key, JSON.stringify(newValue));
    } catch (err) {
      // console.error(err);
    }
  });
};

const sessionStorageEffect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
  try {
    const savedValue = sessionStorage.getItem(node.key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  } catch (err) {
    // console.error(err);
  }
  onSet((newValue) => {
    try {
      sessionStorage.setItem(node.key, JSON.stringify(newValue));
    } catch (err) {
      // console.error(err);
    }
  });
};

const cookieEffect = (initialCookie: any) => {
  const effect: AtomEffect<any> = ({ setSelf, onSet, node }) => {
    try {
      const cookie = getCookie(node.key);

      if (cookie === undefined) {
        setSelf(initialCookie);
      } else {
        setSelf(JSON.parse(cookie));
      }
    } catch (err) {
      // console.error(err);
    }

    onSet((newValue) => {
      try {
        setCookie(node.key, JSON.stringify(newValue), { expires: new Date(Date.now() + 3.154e10) });
      } catch (err) {
        // console.error(err);
      }
    });
  };

  return effect;
};

export type ColorScheme = "light" | "dark";

export const colorSchemeAtom = atom<ColorScheme>({
  key: "colorScheme",
  default: "dark",
  effects: [localStorageEffect],
});
