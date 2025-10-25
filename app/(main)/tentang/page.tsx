import React from "react";
import { Feature15 } from "@/components/feature15";
import { Feature42 } from "@/components/feature42";
import { Service2 } from "@/components/service2";

export default function Tentang() {
  return (
    <div className="flex flex-col w-full px-5 md:px-0">
      <Service2 />
      <Feature42 />
      <Feature15 />
    </div>
  );
}
