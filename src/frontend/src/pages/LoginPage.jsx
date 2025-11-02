import { useState } from 'react';
import { 
  Paper, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Container, 
  Group, 
  Anchor 
} from '@mantine/core';
import { Link } from 'react-router-dom';

export function LoginPage() {
  // 1. Create state to store what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. A function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading
    setIsLoading(true);
    
    // TODO: Send this data to your backend!
    console.log('Submitting login form:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulate an API call
    setTimeout(() => {
      alert('Logged in (simulated) with: ' + email);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container 
      size={450} 
      my={100}>
      <Title ta="center">
        Welcome to *INPUT NAME*!
      </Title>

      <Paper 
        withBorder 
        shadow="md" 
        p={30} 
        mt={30} 
        radius="md">
        {/* 3. The form itself */}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="username@example.com"
            required
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
            mt="xl" 
            type="submit"
            loading={isLoading}
          >
            Sign in
          </Button>
        </form>

        <Group justify="center" mt="md">
          <Anchor component={Link} to="/signup" size="sm">
          Don't have an account? Sign up
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}