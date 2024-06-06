"use client";

import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  search: z.string({ required_error: "Campo obrigatório" })
    .trim()
    .min(1, "Campo obrigatório")
    .max(50)
});


function Search() {
  const router = useRouter();
  const searchParams = useSearchParams().get('search');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams ? searchParams : '',
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershop?search=${data.search}`);
  }

  return (
    <div className="flex items-center gap-2">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-4">

          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <Input placeholder="Busque uma barbearia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit" >
            <SearchIcon size={20} />
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default Search;