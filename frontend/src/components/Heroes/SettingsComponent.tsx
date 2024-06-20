import {
  Card,
  CardBody,
  Stack,
  StackDivider,
  SimpleGrid,
  Button,
  Box,
  Heading,
  useToast,
  Flex,
  Spinner,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiPlus, FiMinus, FiRefreshCcw } from 'react-icons/fi'
import { useState } from 'react'
import { HeroOut, HeroesOut } from '../../client'

interface SettingsComponentProps {
  heroes: HeroesOut // Replace 'any' with the actual hero data type
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ heroes }) => {
  const toast = useToast()
  const textColor = useColorModeValue('ui.dark', 'ui.white')

  const [isLoading, setIsLoading] = useState(false)
  const [randomHero, setRandomHeroInternal] = useState<any | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedAttackTypes, setSelectedAttackTypes] = useState<string[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])

  const attributes: { [key: string]: string } = {
    agi: 'Agility',
    int: 'Intelligence',
    str: 'Strength',
    all: 'Universal',
  }
  const roles = [
    'Carry',
    'Disabler',
    'Durable',
    'Escape',
    'Initiator',
    'Nuker',
    'Pusher',
    'Support',
  ]
  const attack_type = ['Melee', 'Ranged']

  const generateRandomHero = () => {
    setIsLoading(true)
    if (heroes?.data) {
      const filteredHeroes = heroes.data.filter((hero: HeroOut) => {
        // Filter by roles
        if (
          selectedRoles.length > 0 &&
          !hero.roles.some((role) => selectedRoles.includes(role))
        ) {
          return false
        }

        // Filter by attack type
        if (
          selectedAttackTypes.length > 0 &&
          !selectedAttackTypes.includes(hero.attack_type)
        ) {
          return false
        }

        // Filter by attributes
        if (
          selectedAttributes.length > 0 &&
          !selectedAttributes.includes(attributes[hero.primary_attr])
        ) {
          return false
        }

        return true
      })

      if (filteredHeroes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredHeroes.length)
        setRandomHeroInternal(filteredHeroes[randomIndex])
      } else {
        toast({
          title: 'Error',
          description: 'No heroes match the selected filters.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Error',
        description: 'Failed to generate a random hero.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  return (
    <Box>
      <Card mt="4">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4" width={'full'}>
            <FilterSection
              title="Attributes"
              items={Object.values(attributes)}
              columns={{ base: 2, md: 1, lg: 2, xl: 2, '2xl': 3 }}
              selectedItems={selectedAttributes}
              setSelectedItems={setSelectedAttributes}
            />
            <FilterSection
              title="Attack Type"
              items={attack_type}
              columns={{ base: 2, md: 1, lg: 2 }}
              selectedItems={selectedAttackTypes}
              setSelectedItems={setSelectedAttackTypes}
            />
            <FilterSection
              title="Roles"
              items={roles}
              columns={{ base: 3, md: 1, lg: 2, xl: 3, '2xl': 4 }}
              selectedItems={selectedRoles}
              setSelectedItems={setSelectedRoles}
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

            {isLoading && (
              <Flex justify="center" align="center" height="100vh" width="100%">
                <Spinner size="xl" color="ui.main" />
              </Flex>
            )}
          </Stack>
        </CardBody>
      </Card>

      {randomHero && (
        <Card mt="4">
          <Stack>
            <CardBody>
              <Heading size="lg" textTransform="uppercase" mb="4">
                {randomHero.localized_name}
              </Heading>
              <Image
                src={randomHero.img}
                alt={randomHero.localized_name}
                borderRadius={6}
                width="75%"
              />

              <Box mt="2" fontSize="lg" color={textColor} fontWeight={500}>
                <Text>Attribute: {attributes[randomHero.primary_attr]}</Text>
                <Text>Attack Type: {randomHero.attack_type}</Text>
                <Text>
                  Roles:{' '}
                  {randomHero.roles.map((role: string) => role).join(', ')}
                </Text>
              </Box>
            </CardBody>
          </Stack>
        </Card>
      )}
    </Box>
  )
}

interface FilterSectionProps {
  title: string
  items: string[]
  columns: any
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  columns,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {title}
      </Heading>
      <Stack spacing={4} direction="row" align="center" mt={'2'}>
        <SimpleGrid columns={columns} spacing={2}>
          {items.map((item) => (
            <FilterButton
              key={item}
              item={item}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

interface FilterButtonProps {
  item: string
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
}

const FilterButton: React.FC<FilterButtonProps> = ({
  item,
  selectedItems,
  setSelectedItems,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  return (
    <Button
      key={item}
      leftIcon={isExpanded ? <FiMinus /> : <FiPlus />}
      size="sm"
      variant={isExpanded ? 'outline' : 'primary'}
      border={isExpanded ? '2px' : '0px'}
      borderColor="ui.main"
      onClick={toggleExpanded}
    >
      {item}
    </Button>
  )
}

export default SettingsComponent
