import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

// Pass in props for each listing
export function FoodCard({ listing }) {
  // Destructure the listing object (you'll get this from your database)
  const { id, title, description, price, imageUrl } = listing;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
          height={160}
          alt={title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="green" variant="light">
          ${price}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={3}>
        {description}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to={`/listing/${id}`} // This links to the details page
      >
        View Details
      </Button>
    </Card>
  );
}