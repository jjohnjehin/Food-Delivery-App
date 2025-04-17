import { Box, Typography, Button } from "@mui/material";

export const Favourite = ({fav,removeFromFav}) => {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
        <Box sx={{marginTop:"130px"}}></Box>
      <Box
        sx={{
          width: "90%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* LEFT COLUMN */}
        <Box sx={{ width: { xs: "100%", md: "100%" }, pr: { md: 2 } }}>
          {fav.length === 0 ? (
            <Typography variant="h6" align="center">
              🛒 No items in Favourite
            </Typography>
          ) : (
            fav.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: 2,
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "10%" } }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
                  <Typography fontWeight="bold">{item.dish_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.restaurant_name}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.slogan}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: "100%", sm: "10%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    // onClick={() => increaseQty(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    // onClick={() => decreaseQty(item.id)}
                    sx={{ mt: 1 }}
                  >
                    -
                  </Button>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "10%" }, textAlign: "center" }}>
                  <Typography variant="h6">
                    {/* {quantities[item.id] || 1} */}
                  </Typography>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "10%" }, textAlign: "center" }}>
                  <Typography variant="h6">
                    {/* ₹{Number(item.price) * (quantities[item.id] || 1)} */}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{ bgcolor: "red", mt: { xs: 1, sm: 0 } }}
                  onClick={() => removeFromFav(item.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "green", mt: { xs: 1, sm: 0 },width:"150px" }}
                  onClick={() => removeFromFav(item.id)}
                >
                  Place Order
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
