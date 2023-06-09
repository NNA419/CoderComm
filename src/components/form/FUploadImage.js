import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import UploadSingleFile from "../UploadSingleFile";


function FUploadImage({ name,image, ...other }) {
    const { control }= useFormContext();
    console.log("FUploadImage")
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <UploadSingleFile
                        image={image}
                        accept="image/*"
                        file={field.value}
                        error={checkError}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    )
}

export default FUploadImage;