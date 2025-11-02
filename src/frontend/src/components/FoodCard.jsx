import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

// Pass in props for each listing
export function FoodCard({ listing }) {
  // Destructure the listing object (you'll get this from your database)
  const { id, title, description, price, image_link, location } = listing;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image_link}
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

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {location}
      </a>

      
    </Card>
  );
}