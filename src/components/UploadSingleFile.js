import isString from "lodash";
import { useDropzone } from "react-dropzone";

import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import RejectionFiles from "./RejectionFiles";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";

const DropZoneStyle = styled("div")(({ theme }) => ({
    outline: "none",
    overflow: "hidden",
    position: "relative",
    height: 200,
    padding: theme.spacing(3, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("padding"),
    backgroundColor: "#F4F6F8",
    border: `1px dashed alpha ('#919EAB', 0.32)`,
    "&:hover": { opacity: 0.72, cursor: "pointer" },  
}));

function UploadSingleFile({ error = false, file, helperText, sx, ...other }) {

    const previewURL = isString(file)
      ? file
      : file && file.preview
      ? file.preview
      : "";

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        IsDragReject,
        fileRejections,
    } = useDropzone({
        accept: "/image/*",
        multiple: false,
        ...other,
    });

    console.log(file);
    console.log(file.preview)

    return (
      <Box sx={{ width: "100%", ...sx }}>
        <DropZoneStyle

          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((IsDragReject || error) && {
              color: "error.main",
              borderColor: "error.light",
              bgcolor: "error.lighter",
            }),
            ...(file && {
              padding: "5% 0",
            }),
          }}
        >
          <input {...getInputProps()} />

          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <AddAPhotoRoundedIcon />
            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: "#637381" }}
              textAlign="center"
            >
              Drop or Select Image
            </Typography>
          </Stack>

          {file && (
            <Box
              sx={{
                top: 8,
                left: 8,
                borderRadius: 1,
                position: "absolute",
                width: "calc(100% - 16px)",
                height: "calc(100% - 16px)",
                overflow: "hidden",
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img
                alt="file preview"
                src={isString(file) ? file.preview : file}
                // src="https://res.cloudinary.com/djua6pen0/image/upload/v1685374185/t4xjpeq2kc7oaewgl5ye.jpg"
              />
            </Box>
          )}
        </DropZoneStyle>

        {fileRejections.length > 0 && (
          <RejectionFiles fileRejections={fileRejections} />
        )}
        {helperText && helperText}
      </Box>
    );
}

export default UploadSingleFile;