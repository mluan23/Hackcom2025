import { AppShell, Header, Title, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom'; // Import Link for navigation

export function AppHeader() {
  return (
    <AppShell
      header={
        <Header height={60} p="md">
          <Group position="apart">
            {/* Logo/Title - Links back to home */}
            <Title 
              order={3} 
              component={Link} 
              to="/" 
              style={{ textDecoration: 'none', color: 'black' }}
            >
              FlockFeast 🐦
            </Title>
            
            {/* Navigation Links */}
            <Group>
              <Button 
                variant="subtle" 
                component={Link} 
                to="/create"
              >
                Post a Meal
              </Button>
              <Button 
                variant="default" 
                component={Link} 
                to="/login"
              >
                Log In
              </Button>
              <Button 
                component={Link} 
                to="/signup"
              >
                Sign Up
              </Button>
            </Group>
          </Group>
        </Header>
      }
    >
      {/* The "children" prop (your actual page content) 
        will be passed in by React Router.
        We'll set this up in App.jsx
      */}
    </AppShell>
  );
}