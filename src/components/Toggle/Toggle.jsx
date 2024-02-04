import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({handleChange, alignment}) {
 
  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={{margin:"0", cursor:"pointer"}}
    >
      <ToggleButton value="All" style={{fontWeight:"bold"}}>All</ToggleButton>
      <ToggleButton value="Credit" style={{fontWeight:"bold"}}>Credit</ToggleButton>
      <ToggleButton value="Debit" style={{fontWeight:"bold"}}>Debit</ToggleButton>
    </ToggleButtonGroup>
  );
}