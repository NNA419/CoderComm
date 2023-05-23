import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright © "}
      <Link color='inherit' href="http:/www.coderschool.vn">
        CoderSchool
      </Link> {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;