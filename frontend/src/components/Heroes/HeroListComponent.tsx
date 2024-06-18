import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import HeroCard from './HeroCard'

interface HeroListProps {
  heroesByAttribute: { [key: string]: any[] } // Replace 'any' with the actual hero data type
}

const HeroListComponent: React.FC<HeroListProps> = ({ heroesByAttribute }) => {
  return (
    <Stack spacing={4}>
      {Object.entries(heroesByAttribute).map(([attributeName, heroes]) => (
        <Stack key={attributeName} spacing={4}>
          <Heading
            size="lg"
            textAlign={{ base: 'center', md: 'center' }}
            mt='2'
            mb='1'
          >
            {attributeName}
          </Heading>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
          >
            {heroes.map((hero) => (
              <HeroCard key={hero.name} hero={hero} />
            ))}
          </SimpleGrid>
        </Stack>
      ))}
    </Stack>
  )
}

export default HeroListComponent
