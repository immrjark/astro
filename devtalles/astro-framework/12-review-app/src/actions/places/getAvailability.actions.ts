import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { prisma } from "../../db";

export const getAvailability
 = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (placeID) => {
    try {
      await new Promise(resolve => setTimeout(resolve,3000))
      
      const isAvilability = Math.random() > 0.5
      const spotsAvilabilable = Math.floor(Math.random() *10) +1

      let message = 'Not Spots Available'
      if (isAvilability) {
        message = (spotsAvilabilable > 1)
          ? `${spotsAvilabilable} spot availables`
          : `1 spot available`
      }

      return {id: placeID, isAvilability, spotsAvilabilable, message}
    } catch (error) {
      throw new Error('Error getting places')
      
    }
  }
})