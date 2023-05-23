import { CheckBox } from "@mui/icons-material";
import { FormControlLabel, FormGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


function FMultyCheckbox({ name, options, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const onSelected = (options) =>
                    field.value.includes(options)
                        ? field.value.filter((value) => value !== options)
                        : [...field.value, options];
                
                return (
                  <FormGroup>
                    {options.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                            <CheckBox
                                checked={field.value.includes(option)}
                                onChange ={() => field.onChange(onSelected(option))}
                            />
                        }
                            label={option}
                            {...other}
                      />
                    ))}
                  </FormGroup>
                );
            }}
        />
    )
}

export default FMultyCheckbox;