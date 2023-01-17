import React, { useState } from 'react';
import { Box } from '@mui/material';

import Login from './Login';
import Register from './Register';

export default function Auth({ props }) {
  const [register, setRegister] = useState(false);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {
        !register ? <Login props={{ ...props, setRegister }} />
          : <Register props={{ ...props, setRegister }} />
      }
    </Box>
  );
}
