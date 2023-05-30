import { GenerateNumbers } from "./types";

export const generateNumbers: GenerateNumbers = (mode: "2" | "3") => {
  if (mode === "2") return [...Array(100).keys()].map(d => d.toString().length === 1 ? { 
    id: crypto.randomUUID(), 
    number: `0${d}`, 
    total: 0 ,
    createdAt: new Date(),
    updatedAt: new Date(),
  } : { 
      id: crypto.randomUUID(), 
      number: d.toString(), 
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    } 
  );

  return [...Array(1000).keys()].map(d => {
    const len = d.toString().length;

    if (len === 1) return { 
      id: crypto.randomUUID(), 
      number: `00${d}`, 
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    else if (len === 2) return { 
      id: crypto.randomUUID(), 
      number: `0${d}`, 
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return { 
      id: crypto.randomUUID(), 
      number: `${d}`, 
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}
