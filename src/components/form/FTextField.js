import { Controller, useFormContext } from "react-hook-form";
import { TextField } from '@mui/material';
import { useState } from "react";


function FTextField({ name, content, ...other }) {

    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            defaultValue={content}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
          />
        )}
      />
    );
}

export default FTextField;