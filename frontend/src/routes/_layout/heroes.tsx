import {
  Container,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  Image,
  Flex,
  Spinner,
  Text,
  Link,
  Box,
  Stack,
  StackDivider,
  Button,
  useMediaQuery, // Import useMediaQuery
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import { ApiError, HeroesService } from '../../client'
import useCustomToast from '../../hooks/useCustomToast'
import { useQuery } from 'react-query'
import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'

export const Route = createFileRoute('/_layout/heroes')({
  component: HeroesFunc,
})

function HeroesFunc() {
  const textColor = useColorModeValue('ui.dark', 'ui.white')
  const showToast = useCustomToast()
  const toast = useToast()
  const {
    data: heroes,
    isLoading,
    isError,
    error,
  } = useQuery('heroes', () => HeroesService.readHeroes())

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast('Something went wrong.', `${errDetail}`, 'error')
  }

  const heroesByAttribute = heroes?.data.reduce(
    (acc, hero) => {
      const attribute = hero.primary_attr
      // Remove the union type and leave only string
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
  )

  // Use useMediaQuery to detect mobile view
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const [randomHero, setRandomHero] = useState<any | null>(null)

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

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" height="100vh" width="100%">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        heroes && (
          <Flex
            direction={isMobile ? 'column' : 'row'} // Change direction on mobile
            width="100%" // Take up full width
            height="100vh" // Take up full height
            alignItems="stretch" // Ensure containers stretch to full height
          >
            <Container
              maxW={isMobile ? '100%' : '70%'} // Full width on mobile, 70% on desktop
              flex="1" // Left container, takes half the width
              p={4} // Add padding for better visual separation
              order={{ base: 2, sm: 2, md: 1, lg: 1 }}
            >
              <Heading
                size="xl"
                textAlign={{ base: 'center', md: 'left' }}
                py={13}
              >
                Heroes List
              </Heading>
              {Object.entries(heroesByAttribute!).map(
                ([attributeName, heroes]) => (
                  <Stack key={attributeName} spacing={4}>
                    <Heading
                      size="lg"
                      textAlign={{ base: 'center', md: 'center' }}
                      mt={'2'}
                      mb={'1'}
                    >
                      {attributeName}
                    </Heading>
                    <SimpleGrid
                      spacing={4}
                      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
                    >
                      {heroes.map((hero) => (
                        <Link
                          key={hero.localized_name}
                          href={`https://www.dota2.com/hero/${hero.localized_name.replace(' ', '')}`}
                          target="blank"
                        >
                          <Card>
                            <CardBody
                              display={'flex'}
                              justifyContent={'center'}
                              padding={1}
                              _hover={{
                                bg: 'ui.main',
                                color: 'white',
                                borderRadius: 6,
                                transition: 'all 0.2s ease-in-out',
                                scale: 1.05,
                                transform: 'scale(1.05)',
                              }}
                            >
                              <Box
                                position="relative"
                                width="100%"
                                height="100%"
                                borderRadius={6}
                              >
                                <Image
                                  src={hero.img}
                                  alt={hero.name}
                                  borderRadius={6}
                                  justifyContent={'center'}
                                  width={'100%'}
                                  height={'100%'}
                                />
                                <Text
                                  position="absolute"
                                  top="50%"
                                  left="50%"
                                  transform="translate(-50%, -50%)"
                                  color="white"
                                  fontSize="sm"
                                  fontWeight="bold"
                                  textAlign="center"
                                  zIndex={1}
                                  opacity={0} // Initially hidden
                                  _hover={{ opacity: 1 }} // Show on hover
                                  width="full"
                                  height="full"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="end"
                                >
                                  {hero.localized_name}
                                </Text>
                              </Box>
                            </CardBody>
                          </Card>
                        </Link>
                      ))}
                    </SimpleGrid>
                  </Stack>
                ),
              )}
            </Container>

            <Container
              maxW={isMobile ? '95%' : '30%'} // Full width on mobile, 30% on desktop
              flex="1" // Right container, takes half the width
              p={4} // Add padding for better visual separation
              ml={3} // Add margin-left to create space between containers
              order="1"
            >
              <Heading
                size="xl"
                textAlign={{ base: 'center', md: 'left' }}
                py={13}
              >
                Settings
              </Heading>
              <Card>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4" width={'full'}>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Attributes
                      </Heading>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        mt={'2'}
                      >
                        <SimpleGrid
                          columns={{ base: 2, md: 1, lg: 2, xl: 2, '2xl': 3 }}
                          spacing={2}
                        >
                          <Button
                            leftIcon={<FiPlus />}
                            bg="ui.main"
                            size="sm"
                            mr="2"
                            width={'full'}
                          >
                            Strength
                          </Button>
                          <Button
                            leftIcon={<FiPlus />}
                            bg="ui.main"
                            size="sm"
                            mr="2"
                            width={'full'}
                          >
                            Agility
                          </Button>
                          <Button
                            leftIcon={<FiPlus />}
                            bg="ui.main"
                            size="sm"
                            mr="2"
                            width={'full'}
                          >
                            Intelligence
                          </Button>
                          <Button
                            leftIcon={<FiPlus />}
                            bg="ui.main"
                            size="sm"
                            width={'full'}
                            mr="2"
                          >
                            Universal
                          </Button>
                        </SimpleGrid>
                      </Stack>
                    </Box>

                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Attack Types
                      </Heading>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        mt={'2'}
                      >
                        <SimpleGrid
                          columns={{ base: 2, md: 1, lg: 2 }}
                          spacing={2}
                        >
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Melee
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Ranged
                          </Button>
                        </SimpleGrid>
                      </Stack>
                    </Box>

                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Roles
                      </Heading>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        mt={'2'}
                      >
                        <SimpleGrid
                          columns={{ base: 3, md: 1, lg: 2, xl: 3, '2xl': 4 }}
                          spacing={2}
                        >
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Carry
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Support
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Nuker
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Disabler
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Durable
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Pusher
                          </Button>
                          <Button leftIcon={<FiPlus />} bg="ui.main" size="sm">
                            Escape
                          </Button>
                        </SimpleGrid>
                      </Stack>
                    </Box>

                    <Button
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

              <Card mt="4" id="generate-hero-card">
                {randomHero && (
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

                      <Box mt="2" fontSize="lg" color={textColor}>
                        <Text>Attack Type: {randomHero.attack_type}</Text>
                        <Text>
                          Roles:{' '}
                          {randomHero.roles
                            .map((role: string) => role)
                            .join(', ')}
                        </Text>
                      </Box>
                    </CardBody>
                  </Stack>
                )}
              </Card>
            </Container>
          </Flex>
        )
      )}
    </>
  )
}

export default HeroesFunc
