import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { login } from '../../../service/authService';
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
import styled from 'styled-components';

const SignIn = styled(MDButton)`
background : linear-gradient(195deg, #49a3f1, #e8851a) !important;
`
const MDBOXIn = styled(MDBox)`
background : linear-gradient(195deg, #49a3f1, #e8851a) !important;
`
function Basic() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const isLoggedIn = 0
  const navigate = useNavigate();

  useEffect(() => {
    // Check if rememberMe data exists in local storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const { email, password } = JSON.parse(savedUser);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return;
    }

    setError('');

    try {
      const response = await login({ email, password });

      if (response.data) {
        // Store token and user data if rememberMe is true
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('user');
        }
        // Redirect or perform other actions on successful login
        localStorage.setItem("userDetail", JSON.stringify(response.data));
        localStorage.setItem('isLoggedIn',1)
        navigate('/create-firm');
      } else {
        setError(response.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBOXIn
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBOXIn>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        aria-label="toggle password visibility"
                        sx={{ p: 1 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>
            {error && (
              <MDBox mb={2}>
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <SignIn
                type="submit"
                variant="gradient"
                color="info"
                fullWidth
              >
                Sign in
              </SignIn>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

