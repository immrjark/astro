import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { prisma } from "../../db";

export const getPlaces = defineAction({
  accept: 'json',
  // input: z.string(), // no recibo argumentos
  handler: async () => {
    try {
      const places = await prisma.place.findMany()
      return places;
    } catch (error) {
      throw new Error('Error getting places')
      
    }
  }
})