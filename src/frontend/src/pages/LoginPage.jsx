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
import { useNavigate } from 'react-router-dom';


export function LoginPage() {
  const navigate = useNavigate();
  // 1. Create state to store what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. A function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading
    setIsLoading(true);

    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const users = await response.json()

    // find user with matching email and password
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      alert('Invalid credentials');
      setIsLoading(false);
      return;
    }

    fetch('http://localhost:3000/users/' + user.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()) 
    .then(user => {
      setIsLoading(false) 
      navigate(`/`)
    })
    .catch(error => {
      console.error('error')
    })
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