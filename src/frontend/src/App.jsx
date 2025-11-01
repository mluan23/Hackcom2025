import { Routes, Route, Outlet } from 'react-router-dom';
import { AppShell, Header, Title, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

// Import your page components
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SignUpPage } from './pages/SignUpPage';

// 1. Create the main App Layout component
function AppLayout() {
  return (
    <AppShell
      header={
        <Header height={60} p="md">
          <Group position="apart">
            <Title order={3} component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
        </Header>
      }
    >
      {/* This is the magic part! React Router will render 
        the correct page component right here.
      */}
      <Outlet />
    </AppShell>
  );
}

// 2. Define your app's routes
export function App() {
  return (
    <Routes>
      {/* All routes inside here will share the AppLayout (with the header) 
      */}
      <Route path="/" element={<AppLayout />}>
        {/* The "index" route is the default page (your homepage) */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="create" element={<CreateListingPage />} />
        <Route path="listing/:id" element={<ListingDetailsPage />} />
        <Route path="my-listings" element={<MyListingsPage />} /> 
      </Route>

      {/* You can add other routes *outside* the layout if needed */}
      {/* <Route path="/some-other-page" element={<SomeOtherPage />} /> */}
    </Routes>
  );
}