import { Routes, Route, Outlet, Link } from 'react-router-dom';
import {
  AppShell,
  Title,
  Group,
  Button,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { SignUpPage } from './pages/SignUpPage';

function AppLayout() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  // Function to toggle between light and dark
  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');

  return (
    <AppShell>
      <AppShell.Header>
        <Group justify="space-between" p="md" h={60}>
          {/* App Title / Logo */}
          <Title
            order={3}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            🍽️ Project Name 🍽️
          </Title>

          {/* Navigation + Theme Toggle */}
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

            {/* 🌗 Theme Toggle Button */}
            <ActionIcon
              onClick={toggleColorScheme}
              variant="light"
              size="lg"
              radius="xl"
              aria-label="Toggle color scheme"
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(20deg)' },
              }}
            >
              {computedColorScheme === 'light' ? (
                <IconMoon
                  size={20}
                  style={{
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    transform: 'rotate(0deg)',
                    opacity: 1,
                  }}
                />
              ) : (
                <IconSun
                  size={20}
                  style={{
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    transform: 'rotate(180deg)',
                    opacity: 1,
                    color: '#FFD43B',
                  }}
                />
              )}
            </ActionIcon>
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
