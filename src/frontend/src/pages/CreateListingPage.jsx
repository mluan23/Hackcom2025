import { Container, Title, Paper } from '@mantine/core';
import { CreateListingForm } from '../components/CreateListingForm';

export function CreateListingPage() {
  return (
    <Container size={600} my={100}>
      <Title order={2} align="center" mb="xl">
        Post a New Meal
      </Title>

      <Paper withBorder shadow="md" p="xl" radius="md">
        <CreateListingForm />
      </Paper>
    </Container>
  );
}
