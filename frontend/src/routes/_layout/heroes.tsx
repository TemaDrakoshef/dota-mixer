import {
  Container,
  Heading,
  Flex,
  Spinner,
  useMediaQuery,
  useColorModeValue,
  Card,
  CardBody,
  Stack,
  Box,
  Image,
  Text,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { ApiError, HeroesService } from '../../client'
import useCustomToast from '../../hooks/useCustomToast'
import { useQuery } from 'react-query'
import { useState } from 'react'
import HeroListComponent from '../../components/Heroes/HeroListComponent'
import SettingsComponent from '../../components/Heroes/SettingsComponent'
import { heroesByAttribute } from '../../utils/heroesUtils'

export const Route = createFileRoute('/_layout/heroes')({
  component: HeroesFunc,
})

function HeroesFunc() {
  const textColor = useColorModeValue('ui.dark', 'ui.white')
  const showToast = useCustomToast()
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

  // Use useMediaQuery to detect mobile view
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const [randomHero, setRandomHero] = useState<any | null>(null)

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
              <HeroListComponent
                heroesByAttribute={heroesByAttribute(heroes)}
              />
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
              <SettingsComponent
                heroes={heroes}
                setRandomHero={setRandomHero}
              />

              {randomHero && (
                <Card mt="4" id="generate-hero-card">
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
                </Card>
              )}
            </Container>
          </Flex>
        )
      )}
    </>
  )
}

export default HeroesFunc
