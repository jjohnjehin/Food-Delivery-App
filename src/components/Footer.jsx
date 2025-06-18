import { Box,Grid,Typography,Link,IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
export const Footer=()=>{
   return (
     <Box
        sx={{
          bgcolor: "#222",
          color: "white",
          padding: "40px 20px 10px",
          mt: 5,
          width: "100%",
          // display:"flex",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
            𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙 🍽️
            </Typography>
            <Typography variant="body2">
              Savor every bite with Fresh Feast – your go-to app for quick and
              tasty food deliveries!
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" underline="hover" color="inherit" display="block">
              Home
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Menu
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Cart
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Contact Us
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">123 Food St, Flavor Town</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">+91 98765 43210</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">support@freshfeast.com</Typography>
            </Box>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copy */}
        <Box textAlign="center" pt={4} borderTop="1px solid #444" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} 𝕱𝖗𝖊𝖘𝖍 𝕱𝖊𝖆𝖘𝖙. All rights reserved.
          </Typography>
        </Box>
      </Box>
   )
}