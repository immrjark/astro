import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { prisma } from "../../db";

export const getPlaces = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (placeID) => {
    try {
      await new Promise(resolve => setTimeout(() => {
        resolve
      }, 3000))
      
      const isAvilability = Math.random() > 0.5
      const spotsAvilabilable = Math.floor(Math.random() *10) +1

      let message = 'Not Spots Abilable'
      if (isAvilability) {
        message = (spotsAvilabilable > 1)
          ? `${spotsAvilabilable} spot abilables`
          : `1 spot abilable`
      }

      return {id: placeID, isAvilability, spotsAvilabilable}
    } catch (error) {
      throw new Error('Error getting places')
      
    }
  }
})