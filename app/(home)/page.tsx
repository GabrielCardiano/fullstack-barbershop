import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/app/_components/header";
import Search from "@/app/(home)/_components/search";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2>Olá, <span className="text-xl font-bold">Gabriel</span></h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM 'de' yyyy'.'", { locale: ptBR, })}
        </p>
      </div>

      <div className="px-5 mt-6">
      <Search />
      </div>
    </div>
  );
}
