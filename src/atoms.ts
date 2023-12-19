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

export enum STATUS {
  "NOT_FINISHED",
  "WIN",
  "LOSE",
}

export interface IResult {
  result: STATUS;
}

export const answerState = atom({
  key: "answer",
  default: "",
});

export const isFinishState = atom<STATUS>({
  key: "isFinish",
  default: STATUS.NOT_FINISHED,
});

export const historyState = atom<{ green: string[]; yellow: string[]; gray: string[] }>({
  key: "history",
  default: { green: [""], yellow: [""], gray: [""] },
});

export const wordleStateState = atom<number>({
  key: "wordleCurrentStage",
  default: 0,
});

export const wordleClickState = atom<number>({
  key: "wordleClickState",
  default: 0,
});
