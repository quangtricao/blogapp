import { Box, Typography, Container, Link } from "@mui/material/";

const Footer = () => {
  return (
    <>
      <Box component="footer" sx={{ backgroundColor: (theme) => theme.palette.grey[200], py: 2 }}>
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            Copyright ©{" "}
            <Link color="inherit" href="">
              Blog App
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
