import { Flex } from '@radix-ui/themes';
import { styled, TextField, Button, InputAdornment, Select, MenuItem } from '@mui/material';
import React from 'react';

export const AppHeader = styled(Flex)({
  padding: '10px 20px',
  gap: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ddd',
});

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('Calgary, AB');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in', location);
  };

  return (
    <Flex gap="10" align="center">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ minWidth: '300px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={handleSearch}>Search</Button>
            </InputAdornment>
          ),
        }}
      />
      <Select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        size="small"
        sx={{ minWidth: '150px' }}
      >
        <MenuItem value="Calgary, AB">Calgary, AB</MenuItem>
        <MenuItem value="Toronto, ON">Toronto, ON</MenuItem>
        <MenuItem value="Vancouver, BC">Vancouver, BC</MenuItem>
      </Select>
    </Flex>
  );
};
