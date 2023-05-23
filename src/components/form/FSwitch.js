import { FormControlLabel, Switch, useFormControl } from "@mui/material";
import { Controller } from "react-hook-form";


function FSwitch({ name, ...other }) {
    const { control } = useFormControl();


    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) =>
                        <Switch
                            {...field}
                            checked={field.value} />}
                />
            }
        />
    )
}

export default FSwitch;