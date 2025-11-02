import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { AppShell, Title, Group, Button } from '@mantine/core';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SignUpPage } from './pages/SignUpPage';

function AppLayout() {
  return (
    <AppShell>
      <AppShell.Header>
        <Group justify="space-between" p="md" h={60}>
          <Title
            order={3}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            🍽️ Project Name 🍽️
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
