"use client";
import { useEffect, useState } from "react";
import Province from "./Province";
import ProvinceSelectButton from "./conponents/ProvinceSelectButton";
interface ForecastData {
  publishingOffice: string;
  reportDatetime: string;
  targetArea: string;
  headlineText: string;
  text: string;
}
export default function Home() {
  const provinces: Province[] = [
    new Province("山梨県","190000"),
    new Province("長野県","200000"),
    new Province("岐阜県","210000"),
    new Province("静岡県","220000"),
    new Province("愛知県","230000"),
  ];
  const [idx,setIdx] = useState<number>(0);
  const inc = () => {
    setIdx((idx + 1) % provinces.length);
    console.log(idx);
  };
  const dec = () => {
    setIdx((idx + provinces.length - 1) % provinces.length);
    console.log(idx);
  };

  const [data,setData] = useState<ForecastData>();

  useEffect(() => {
    const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${provinces[idx].code}.json`;
    const fetchData = async () => {
      console.log('aaa')
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    fetchData();
}, [idx]);

  return (
    <div>
      <p>{provinces[idx].name}</p>
      <p>{data ? data.text : "Now Loading"}</p>
      <ProvinceSelectButton
        length={provinces.length}
        setIdx={setIdx}
        idx={idx}
      />
    </div>
  );
}
