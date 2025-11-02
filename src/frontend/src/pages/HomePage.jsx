import { SimpleGrid, Container, Title, Text } from '@mantine/core';
import { FoodCard } from '../components/FoodCard';
import { useState } from 'react';
import { useEffect } from 'react';


export function HomePage() {
  // Example food listings
  // get listings form db
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch('http://localhost:3000/listings', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    }

    fetchListings();
  }, []);

  return (
    <Container
      size="lg"
      my="xl"
      mt={100}
    >
      <Title 
      order={2} 
      mb="md" 
      ta="center"
      >
          Listed Meals
      </Title>
      <Text ta="center" c="dimmed" mb="xl">
        Check out some of today's available meals!
      </Text>

      <SimpleGrid cols={3} spacing="lg" breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
      ]}>
        {listings.map((listing) => (
          <FoodCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>
    </Container>
  );
}