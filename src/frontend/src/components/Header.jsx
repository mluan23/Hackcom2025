// Not necessary, as App.jsx now uses AppHeader

import { AppShell, Title, Group, Button } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

export function AppHeader() {
  return (
    <AppShell
      padding="md"
      header={
        <AppShell.Header height={60} p="md">
          <Group position="apart" style={{ width: '100%' }}>
            <Title
              order={3}
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'black' }}
            >
              FlockFeast 🍽️
            </Title>

            <Group>
              <Button variant="subtle" component={Link} to="/create">
                Post a Meal
              </Button>
              <Button variant="default" component={Link} to="/login">
                Log In
              </Button>
              <Button component={Link} to="/signup">
                Sign Up
              </Button>
            </Group>
          </Group>
        </AppShell.Header>
      }
    >
      {/* React Router outlet for nested routes */}
      <Outlet />
    </AppShell>
  );
}
