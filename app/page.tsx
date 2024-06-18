import AccidentComponent from "@/components/templates/AccidentComponent";
import MyCar from "@/components/templates/MyCar";
import OtherCars from "@/components/templates/OtherCars";
import StartComponent from "@/components/templates/StartComponent";
import StreetLines from "@/components/templates/StreetLines";

export default function Home() {
  return (
    <div className="flex size-full justify-center bg-neutral-300">
      {/* <StartComponent /> */}
      <div className="relative h-full w-80 overflow-y-hidden bg-zinc-600 px-2">
        <StreetLines />
        <MyCar />
        <OtherCars />
      </div>
      <AccidentComponent />
    </div>
  );
}
