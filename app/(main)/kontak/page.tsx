import React from "react";
import { Contact2 } from "@/components/contact2";
import { Service2 } from "@/components/service2";

export default function Kontak() {
    return (
        <div className="flex flex-col w-full px-5 md:px-0">
            <Service2 />
            <Contact2 />
        </div>
    );
}
