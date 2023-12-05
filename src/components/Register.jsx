import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const navButtonStyles = {
    color: "brown",
    textDecoration: 'none',
    '&:hover': {
      color: "solid #43464B 1px",
    },
    '&.active': {
      color: 'text.secondary'
    },
    width: 200,
    height: 50,
    border: '1px solid',
    borderColor: "solid #43464B 1px",
    fontSize: "20px",
  }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  async function register() {
    try {
      if (!username || !password || !email) {
        throw new Error("All fields are required");
      }
      if (username.length > 20 || password.length > 20 || email.length > 50) {
        throw new Error("One of the fields exceeded its maximum lenght")
      }
      console.warn(email, password);
      let item = { username: username, email: email, password: password };
      let result = await fetch("/api/api/auth/signup", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });

      if (!result.ok) {
        throw new Error("Registration failed. Please check your details and try again.");
      }

      result = await result.json();
      navigate('/Signin');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Box>
      <Typography pt={5} sx={[{ fontSize: "50px", textAlign: 'center', fontWeight: "bold", marginBottom: 10 }]}>
        Registracija
      </Typography>
      <Box>
        <Box component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '25ch' },
            margin: 5,
          }}>
            <TextField
                required
                id="outlined-required"
                label="Username"
                onChange={handleUsernameChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                onChange={handlePasswordChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                onChange={handleEmailChange}
              />
          </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Button onClick={register} sx={navButtonStyles}>Registruotis</Button>
        <Button component={Link} to="/Signin" sx={navButtonStyles}>Prisijungti</Button>
      </Box>
    </Box>
  );
}
