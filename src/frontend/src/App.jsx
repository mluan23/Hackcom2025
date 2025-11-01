import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { AppShell, Title, Group, Button } from '@mantine/core';

// Import your page components
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SignUpPage } from './pages/SignUpPage';

// 1. App Layout (header + main content)
function AppLayout() {
  return (
    <AppShell>
      {/* App Header */}
      <AppShell.Header>
        <Group justify="space-between" p="md" h={60}>
          <Title
            order={3}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            FlockFeast 🐦
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

      {/* Main content area where pages are rendered */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

// 2. Define the app’s routes
export function App() {
  return (
    <Routes>
      {/* Routes inside the AppLayout share the header */}
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
