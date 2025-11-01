import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { AppShell, Header, Navbar, Title, Group, Button, Text } from '@mantine/core';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SignUpPage } from './pages/SignUpPage';

function AppLayout() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} p="md">
          <Navbar.Section mb="sm">
            <Text weight={500}>Navigation</Text>
          </Navbar.Section>
          <Navbar.Section>
            <Button component={Link} to="/" variant="subtle" fullWidth mb="xs">
              Home
            </Button>
            <Button component={Link} to="/my-listings" variant="subtle" fullWidth mb="xs">
              My Listings
            </Button>
            <Button component={Link} to="/create" variant="subtle" fullWidth mb="xs">
              Post a Meal
            </Button>
          </Navbar.Section>
        </Navbar>
      }
    >
      <AppShell.Header>
        <Group position="apart" p="md" h={60}>
          <Title
            order={3}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            🍽️ Project Name 🍽️
          </Title>

          <Group>
            <Button variant="default" component={Link} to="/login">
              Log In
            </Button>
            <Button component={Link} to="/signup">
              Sign Up
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="create" element={<CreateListingPage />} />
        <Route path="listing/:id" element={<ListingDetailsPage />} />
        <Route path="my-listings" element={<MyListingsPage />} />
      </Route>
    </Routes>
  );
}