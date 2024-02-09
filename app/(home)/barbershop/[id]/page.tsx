import { db } from "@/app/_lib/prisma";

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

import BarbershopInfo from "@/app/(home)/barbershop/[id]/_components/barbershopInfo";
import ServiceItem from "@/app/(home)/barbershop/[id]/_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopDetailsPageProps {
  params: {
    id?: string,
  },
}

const BarbershopDetailsPage: React.FC<BarbershopDetailsPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true }
  });

  if (!barbershop) {
    // TODO: redirecionar para a HomePage.
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>

    </div>
  )
}

export default BarbershopDetailsPage;