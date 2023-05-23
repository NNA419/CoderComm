function Card(theme) {
    return {
        MuiCard: {
            StyledOverrides: {
                root: {
                    position: "relative",
                    borderRadius: Number(theme.shape.borderRadius) * 2,
                    zIndex: 0, // Fix Safari overflow : hidden with border radius
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: "h6" },
                subheaderTypographyProps: {
                    variant: "body2",
                    marginTop: theme.spacing(0.5),
                },
            },
            styledOverrides: {
                root: {
                    padding: theme.spacing(3, 3, 0),
                },
            },
        },
        MuiCardContent: {
            styledOverrides: {
                root: {
                    padding: theme.spacing(3),
                },
            },
        },
    };
}

export default Card