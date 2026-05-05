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
    <CardCurtainReveal className="h-[560px] w-96 border border-zinc-100 bg-zinc-950 text-zinc-50 shadow">

      <CardCurtainRevealBody>

        {/* IMAGE */}
        <CardCurtainRevealTitle>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </CardCurtainRevealTitle>

        {/* TITLE */}
        <h3 className="text-xl font-semibold mt-4">
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <CardCurtainRevealDescription className="my-4">
          <p>
            Scalable Shopify store built with performance and conversion-focused design.
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