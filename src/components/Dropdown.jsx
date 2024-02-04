import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo({handleType,type}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Type
        </InputLabel>
        <NativeSelect
          value={type}
          inputProps={{
            name: 'type',
            id: 'uncontrolled-native',
          }}
          onChange={(e)=> handleType(e)}
        >
          <option value={"Select"}>Select</option>
          <option value={"Credit"}>Credit</option>
          <option value={"Debit"}>Debit</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
