import {
  Card,
  CardBody,
  Stack,
  StackDivider,
  SimpleGrid,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

interface SettingsComponentProps {
  heroes: any // Replace 'any' with the actual hero data type
  setRandomHero: (hero: any) => void // Replace 'any' with the actual hero data type
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  heroes,
  setRandomHero,
}) => {
  const toast = useToast()

  const generateRandomHero = () => {
    if (heroes?.data) {
      const randomIndex = Math.floor(Math.random() * heroes.data.length)
      setRandomHero(heroes.data[randomIndex])
    } else {
      toast({
        title: 'Error',
        description: 'Failed to generate a random hero.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const roles = [
    'Carry',
    'Initiator',
    'Durable',
    'Disabler',
    'Support',
    'Nuker',
    'Pusher',
    'Escape',
  ]

  const attack_type = ['Melee', 'Ranged']
  const attributes = ['Strength', 'Agility', 'Intelligence', 'Universal']

  return (
    <Card mt="4" id="generate-hero-card">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" width={'full'}>
          <FilterSection
            title="Attributes"
            items={attributes}
            columns={{ base: 2, md: 1, lg: 2, xl: 2, '2xl': 3 }}
          />
          <FilterSection
            title="Attack Type"
            items={attack_type}
            columns={{ base: 2, md: 1, lg: 2 }}
          />
          <FilterSection
            title="Roles"
            items={roles}
            columns={{ base: 3, md: 1, lg: 2, xl: 3, '2xl': 4 }}
          />

          <Button
            leftIcon={<FiRefreshCcw />}
            onClick={generateRandomHero}
            border="2px"
            borderColor="ui.main"
            variant="outline"
          >
            Generate Hero
          </Button>
        </Stack>
      </CardBody>
    </Card>
  )
}

interface FilterSectionProps {
  title: string
  items: string[]
  columns: any
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  columns,
}) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {title}
      </Heading>
      <Stack spacing={4} direction="row" align="center" mt={'2'}>
        <SimpleGrid columns={columns} spacing={2}>
          {items.map((item) => (
            <Button
              key={item}
              leftIcon={<FiPlus />}
              bg="ui.main"
              size="sm"
              variant="primary"
            >
              {item}
            </Button>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

export default SettingsComponent
