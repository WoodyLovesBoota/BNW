import { atom } from "recoil";

export const fourtynineResState = atom<number[]>({
  key: "fourtynineResult",
  default: [],
  effects: [
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem("fourtyNineResult");
      if (savedValue !== null) setSelf(JSON.parse(savedValue));
      onSet((newValue: any, _: any, isReset: boolean) => {
        isReset
          ? localStorage.removeItem("fourtyNineResult")
          : localStorage.setItem("fourtyNineResult", JSON.stringify(newValue));
      });
    },
  ],
});
