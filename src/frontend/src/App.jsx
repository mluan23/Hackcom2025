import { Routes, Route, Outlet, Link } from 'react-router-dom';
import {
  AppShell,
  Title,
  Group,
  Button, // <--- RE-ADDED THIS IMPORT
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Container,
  Center,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
  RedirectToSignIn,
} from '@clerk/clerk-react';

// Import your pages
import { HomePage } from './pages/HomePage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { MyListingsPage } from './pages/MyListingsPage';

// We no longer need these! Clerk handles them.
// import { LoginPage } from './pages/LoginPage';
// import { SignUpPage } from './pages/SignUpPage';

// 1. This is your main layout for logged-in users
function AppLayout() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');

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
            🍽️ ProjectName 🍽️
          </Title>

          <Group>
            {/* --- THIS IS THE BUTTON YOU WANTED --- */}
            <Button variant="subtle" component={Link} to="/create">
              Post a Meal
            </Button>
            {/* ------------------------------------ */}

            <ActionIcon
              onClick={toggleColorScheme}
              variant="light"
              size="lg"
              radius="xl"
            >
              {computedColorScheme === 'light' ? (
                <IconMoon size={20} />
              ) : (
                <IconSun size={20} />
              )}
            </ActionIcon>
            <UserButton afterSignOutUrl="/login" />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

function AuthLayout() {
  return (
    <Container size={450} my={100}>
      <Center>
        <Outlet />
      </Center>
    </Container>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<SignIn routing="path" path="/login" />}
        />
        <Route
          path="/signup"
          element={<SignUp routing="path" path="/signup" />}
        />
      </Route>

      <Route
        element={
          <SignedIn>
            <AppLayout />
          </SignedIn>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateListingPage />} />
        <Route path="listing/:id" element={<ListingDetailsPage />} />
        <Route path="my-listings" element={<MyListingsPage />} />
      </Route>

      {/* Catch-all route to handle auth redirect */}
      <Route
        path="*"
        element={
          <>
            <SignedIn>
              <AppLayout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}