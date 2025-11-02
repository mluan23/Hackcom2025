import { SimpleGrid, Container, Title, Text } from '@mantine/core';
import { FoodCard } from '../components/FoodCard';

export function HomePage() {
  // Example food listings
  const listings = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      description: 'Delicious homemade spaghetti with rich tomato and meat sauce.',
      price: 9.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Spaghetti',
    },
    {
      id: 2,
      title: 'Chicken Caesar Salad',
      description: 'Fresh romaine lettuce with grilled chicken, parmesan, and croutons.',
      price: 4.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Salad',
    },
    {
      id: 3,
      title: 'Vegan Buddha Bowl',
      description: 'Healthy bowl with quinoa, chickpeas, roasted veggies, and tahini dressing.',
      price: 7.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Buddha+Bowl',
    },
    {
      id: 4,
      title: 'Cheeseburger',
      description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce.',
      price: 5.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Cheeseburger',
    },
  ];

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
