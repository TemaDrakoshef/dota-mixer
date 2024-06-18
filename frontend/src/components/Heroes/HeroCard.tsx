// src/components/HeroCard.tsx
import { Card, CardBody, Image, Link, Text, Box } from '@chakra-ui/react'

interface HeroCardProps {
  hero: any // Replace 'any' with the actual hero data type
}

const HeroCard: React.FC<HeroCardProps> = ({ hero }) => {
  return (
    <Link
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
          <Box position="relative" width="100%" height="100%" borderRadius={6}>
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
              color="ui.white"
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
  )
}

export default HeroCard
