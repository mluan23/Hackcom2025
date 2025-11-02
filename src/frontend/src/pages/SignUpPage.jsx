import { useState } from 'react';
import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log('Submitting signup form:');
    console.log({ "first_name": firstName, "last_name": lastName, "email": email, "password": password });

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "first_name": firstName, "last_name": lastName, "email": email, "password": password }),
    }).then(response => {
      alert(`Account created (simulated) for: ${response} ${lastName}`);
      setIsLoading(false);
    })
  };

  return (
    <Container
      size={450}
      my={100}
      sx={(theme) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.md,
      })}
    >
      <Title ta="center" order={2} mb="xl">
        Create Your *Input Project Name* Account
      </Title>

      <Paper
        withBorder
        shadow="md"
        radius="md"
        p={30}
        mt={30}
        sx={(theme) => ({
          width: '100%',
          maxWidth: 450,
          padding: theme.spacing.xl,
        })}
      >
        <form onSubmit={handleSubmit}>
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="First"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <TextInput
              label="Last Name"
              placeholder="Last"
              required
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
          </Group>

          <TextInput
            label="Email"
            placeholder="username@example.com"
            required
            mt="md"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            mt="md"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />

          <Button
            fullWidth
            mt="md"
            // component={Link}
            type="submit"
            loading={isLoading}
            variant="filled"
          >
            Sign Up
          </Button>
        </form>

        <Group justify="center" mt="md">
          <Anchor component={Link} to="/login" size="sm">
            Already have an account? Log in
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}