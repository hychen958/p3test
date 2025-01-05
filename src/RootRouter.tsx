// External library imports
import { Route, Routes } from 'react-router-dom';
import { SignUp, useAuth, UserButton } from '@clerk/clerk-react';
import { Grid, Spinner } from '@radix-ui/themes';
import { Divider } from '@mui/material';

// Component imports
import ResponsiveAppBar from './components/layout/ResponsiveAppBar';
import RequireAuth from './components/RequireAuth';

// Page imports
import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import { Example } from './pages/Example';
import { AppHeader } from './components/layout/AppHeader';
import { Link } from './components/Link';
import { Divider, Typography } from '@mui/material';
import { Home } from './pages/Home';
import { Discussion } from './pages/Discussion';
import { QA } from './pages/Q&A';
import { Settings } from './pages/Settings';


const ErrorPage = () => <div>Error Page</div>;

export const RootRouter = () => {
  const auth = useAuth(); // Access Clerk authentication state
  console.log(auth);

  // Show a loading spinner while authentication state is loading
  if (!auth.isLoaded)
    return (
      <Grid>
        <Spinner />
      </Grid>
    );

  return auth.isSignedIn ? (
    // Authenticated user view
    <Grid>
      <AppHeader>
        <Flex gap="3" align="end">
          <Typography variant="h5">Lexter Lens</Typography>
          <Link to="/home">Home</Link>
          <Link to="/lawyers">Lawyers</Link>
          <Link to="/discussion">Discussion</Link>
          <Link to="/q&a">Q&A</Link>
          <Link to="/settings">Settings</Link>
        </Flex>
        <UserButton />
      </AppHeader>
      <Divider />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/q&a" element={<QA />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Grid>
  ) : (
    // Unauthenticated user view
    <Grid>
      <ResponsiveAppBar>
        <UserButton />
      </ResponsiveAppBar>
      <Divider />
      <Routes>
        {/* Public routes accessible without authentication */}
        <Route path="/example" element={<Example />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<UnauthedDashboard />} />
      </Routes>
    </Grid>
  );
};
