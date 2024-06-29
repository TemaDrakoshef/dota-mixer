// src/utils/heroesUtils.ts
export const heroesByAttribute = (heroes: any) => {
  // Replace 'any' with the actual hero data type
  return heroes?.data.reduce(
    (acc, hero) => {
      const attribute = hero.primary_attr
      const attributeName: string = {
        agi: 'Agility',
        all: 'Universal',
        str: 'Strength',
        int: 'Intelligence',
      }[attribute]!

      if (!acc[attributeName]) {
        acc[attributeName] = []
      }

      acc[attributeName].push(hero)
      return acc
    },
    {} as { [key: string]: any[] },
  ) // Replace 'any' with the actual hero data type
}
