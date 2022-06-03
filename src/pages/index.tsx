import type { NextPage } from 'next'
import { Box, Text } from '@mantine/core'

const Home: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      <Text>Hi</Text>
    </Box>
  )
}

export default Home
