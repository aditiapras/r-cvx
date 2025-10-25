import { Blog8 } from "@/components/blog8";
import { Casestudies3 } from "@/components/casestudies3";
import { Service2 } from "@/components/service2";

export default function Informasi() {
  return (
    <div className="flex flex-col w-full px-5 md:px-0">
      <Service2 />
      <Casestudies3 />
      <Blog8 />
    </div>
  );
}
