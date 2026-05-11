'use client';

import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
} from "../card-curtain-reveal";

import { ArrowUpRight } from "lucide-react";
import { Button } from "../button";

export function ShopifyCard({ project }: any) {
  return (
    <CardCurtainReveal className="h-[560px] w-full border border-zinc-100 bg-[#2b2b2b] text-zinc-50 shadow">

      <CardCurtainRevealBody>

        {/* IMAGE */}
        <CardCurtainRevealTitle 
        className="h-20 text-start">
          <img
            src={project.logo}
            alt={project.title}
            className="w-50 min-h-20 max-w-40 max-h-20 text-start object-contain rounded-md"
          />
        </CardCurtainRevealTitle>

        {/* TITLE */}
        {/* <h3 className="text-xl font-semibold mt-4">
          {project.title}
        </h3> */}

        {/* DESCRIPTION */}
        <CardCurtainRevealDescription className="my-4">
          <p>
            {project.desc}
          </p>
        </CardCurtainRevealDescription>

        {/* CTA */}
        <a href={project.url} target="_blank">
          <Button
            variant="secondary"
            size="icon"
            className="aspect-square rounded-full"
          >
            <ArrowUpRight />
          </Button>
        </a>

        <CardCurtain className="bg-zinc-50" />
      </CardCurtainRevealBody>

      {/* FOOTER */}
      <CardCurtainRevealFooter className="mt-auto">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
      </CardCurtainRevealFooter>

    </CardCurtainReveal>
  );
}