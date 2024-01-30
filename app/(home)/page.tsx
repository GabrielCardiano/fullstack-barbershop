import { format } from "date-fns";
import Header from "../components/header";
import { ptBR } from "date-fns/locale";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2>Olá, <span className="text-xl font-bold">User</span>!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM 'de' yyyy'.'", { locale: ptBR, })}
        </p>
      </div>
    </div>
  );
}
