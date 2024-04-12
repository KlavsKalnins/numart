import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const cellNumbers: number[][] = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 4, 6, 8, 0, 2, 4, 6, 8],
    [3, 6, 9, 2, 5, 8, 1, 4, 7],
    [4, 8, 2, 6, 0, 4, 8, 2, 6],
    [5, 0, 5, 0, 5, 0, 5, 0, 5],
    [6, 2, 8, 4, 0, 6, 2, 8, 4],
    [7, 4, 1, 8, 5, 2, 9, 6, 3],
    [8, 6, 4, 2, 0, 8, 6, 4, 2],
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
  ];

  const [date, setDate] = useState<string>("1999-11-28");
  const [pattern, setPattern] = useState<number[][]>(cellNumbers);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDate(value);
  };

  const containsDateNumbers = (num: number) => {
    const numStr = num.toString();

    for (let i = 0; i < numStr.length; i++) {
      if (date.includes(numStr[i])) {
        return true;
      }
    }

    return false;
  };

  const [trueColor, setTrueColor] = useState("#000000");
  const [falseColor, setFalseColor] = useState("#ffffff");

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 gap-4 ${inter.className}`}
    >
      <div className="w-[350px] flex justify-center flex-col gap-2 text-center">
        <p className="text-xl font-bold">Numart</p>
        <div className="w-full flex flex-col items-end gap-1">
          <input
            className="bg-black text-white p-2 rounded"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <label className="flex justify-center items-center">
            <p>Color 1:</p>
            <input
              type="color"
              value={trueColor}
              onChange={(e) => setTrueColor(e.target.value)}
            />
          </label>
          <label className="flex justify-center items-center">
            <p>Color 2:</p>
            <input
              type="color"
              value={falseColor}
              onChange={(e) => setFalseColor(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col w-[350px] border-white border-2">
        {[...Array(2)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="w-full flex">
            {[...Array(2)].map((_, colIndex) => (
              <div key={`col-${colIndex}`} className="w-[350px]">
                <div className="grid grid-cols-9 gap-0">
                  {[...Array(9)].map((_, row) =>
                    [...Array(9)].map((_, col) => (
                      <div
                        key={`cell-${row}-${col}`}
                        className={`w-5 h-5 ${
                          containsDateNumbers(pattern[row][col])
                            ? "bg-black"
                            : "bg-white"
                        }`}
                        style={{
                          background: `${
                            containsDateNumbers(pattern[row][col])
                              ? trueColor
                              : falseColor
                          }`,
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
