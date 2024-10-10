import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations/user.mutations';
import { Login } from '@mui/icons-material';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query';
import { useLocation, useNavigate } from 'react-router-dom';

const pages = ['transaction', 'overview', 'budgets', 'Wallet Settings'];
const pagesObj = { '/': 'transaction', '/overview': 'overview', '/budgets': 'budgets', '/wallet-settings': 'Wallet Settings' }
const settings = ['Logout'];

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const client = useApolloClient();
  const [logout, { loading }] = useMutation(LOGOUT);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("currentPath", currentPath);



  const [selectedPage, setSelectedPage] = React.useState('transaction');

  React.useEffect(() => {
    setSelectedPage(pagesObj[currentPath]);
  }, [])

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = async (setting, e) => {
    e.stopPropagation();
    if (setting === 'Logout') {
      try {
        await logout({
          update(cache) {
            try {
              cache.writeQuery({
                query: GET_AUTHENTICATED_USER,
                data: {
                  authUser: null,
                },
              });
            } catch (e) {
              console.error("Error updating cache after logout:", e);
            }
          },
          optimisticResponse: {
            logout: true,
          },
        });

        // Clear store to ensure all data is removed
        // await client.clearStore(); 
        localStorage.clear();
      } catch (error) {
        console.error("Logout failed:", error.message || error);
        if (error.networkError) {
          console.error("Network error:", error.networkError);
        }
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }
      }
    }
    handleCloseUserMenu();
  }


  const handleNavClick = (e, page) => {
    e.preventDefault();
    if (page === 'Wallet Settings') {
      navigate('/wallet-settings');
      setSelectedPage('Wallet Settings');
    } else if (page === 'transaction') {
      navigate('/');
      setSelectedPage('transaction');
    } else {
      navigate(`/${page}`);
      setSelectedPage(page);
    }
    handleCloseNavMenu();
  }

  return (
    <AppBar
      position="sticky" // Change this to sticky
      sx={{ backgroundColor: '#12C48B', top: 0, zIndex: 1201 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="cursor-pointer"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Expense Tracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e) => handleNavClick(e, page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => handleNavClick(e, page)}
                sx={{
                  my: 2,
                  color: selectedPage === page ? '#1DE9B6' : '#FFFFFF', // Soft teal for active text
                  display: 'block',
                  borderBottom: selectedPage === page
                    ? '2px solid linear-gradient(to right, #1DE9B6, #A7FFEB)' // Gradient underline for active
                    : 'none',
                  transition: 'color 0.3s, border-bottom 0.3s', // Smooth transition for a better experience
                }}
                aria-current={selectedPage === page ? 'page' : undefined} // Accessibility
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => handleSettingClick(setting, e)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
