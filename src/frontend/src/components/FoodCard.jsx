import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function FoodCard({ listing }) {
  const { id, title, description, price, image_link, location, purchased } = listing;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (

    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {purchased && (
  <Text
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#444',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: 6,
    }}
  >
    Purchased
  </Text>
)}
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

      {/* <Button
        onClick={() => {
          fetch('http://localhost:3000/listings/' + id, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          
          })
        }}
        >
        Purchase
      </Button> */}

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