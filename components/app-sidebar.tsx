"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getTopKosts } from "@/lib/firebaseAction";

interface KostFromFirebase {
  id: string;
  title: string;
  suka: number;
}

interface KostFull {
  id: string;
  title: string;
  suka: number;
  price: string;
  image: string;
}

const kostDetail: Record<
  string,
  { title: string; price: string; image: string }
> = {
  "Kost Genteng Biru": {
    title: "Kost Genteng Biru",
    price: "800.000",
    image: "/1.jpeg",
  },
  "Kost Genteng Merah": {
    title: "Kost Genteng Merah",
    price: "800.000",
    image: "/2.jpeg",
  },
  "Kost Nibil": {
    title: "Kost Nibil",
    price: "750.000",
    image: "/3.jpeg",
  },
  "Kost Romancy": {
    title: "Kost Romancy",
    price: "1.200.000",
    image: "/4.jpeg",
  },
  "Kost Bonita": {
    title: "Kost Bonita",
    price: "700.000",
    image: "/5.jpeg",
  },
  "Kost Glory": {
    title: "Kost Glory",
    price: "900.000",
    image: "/6.jpeg",
  },
  "Kost Executive Family": {
    title: "Kost Executive Family",
    price: "850.000",
    image: "/7.jpeg",
  },
  "Kost Anugerah": {
    title: "Kost Anugerah",
    price: "1.000.000",
    image: "/8.jpeg",
  },
  "Kos Rajawali": {
    title: "Kos Rajawali",
    price: "1.200.000",
    image: "/9.jpeg",
  },
  "Kost Mulia": {
    title: "Kost Mulia",
    price: "1.000.000",
    image: "/10.jpeg",
  },
  "D’Kost": {
    title: "D’Kost",
    price: "1.250.000",
    image: "/11.jpeg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [topKosts, setTopKosts] = useState<KostFull[]>([]);

  useEffect(() => {
    const fetchTopKosts = async () => {
      const result: KostFromFirebase[] = await getTopKosts(); // ambil dari firebase

      const enriched = result.map((kost) => {
        const detail = kostDetail[kost.title];
        return {
          id: kost.id,
          title: kost.title,
          suka: kost.suka,
          price: detail?.price ?? "N/A",
          image: detail?.image ?? "/placeholder.jpg",
        };
      });

      setTopKosts(enriched);
    };

    fetchTopKosts();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">INDEKOST</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarContent>
      <div className="mb-20">
        <div className="ml-2 font-bold text-center underline">
          Kost Yang Paling Disukai
        </div>
        <NavMain items={topKosts} />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
