<Box sx={{width: "83%",height: "auto",display: "flex",flexWrap: "wrap",justifyContent: "center",gap: { xs: 1.5, sm: 2, md: 3 },}}>
            {[
  { name: "Salad", image: "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Italian-Fresh-Vegetable-Salad_EXPS_HCAPB22_86057_P2_MD_06_29_7b.jpg",gif:"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFvamIyMGg0aWoxeDJ6d2xwY2VrZm53NHh3MTgwZHNocDJlc3NwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y4yJaxSPmxgEo/giphy.gif" },
  { name: "Rolls", image: "https://th.bing.com/th/id/OIP.sGcCXwOzsqdNddlSfxHNnAHaLG?w=1067&h=1600&rs=1&pid=ImgDetMain",gif:"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWo3aW4zMjM4Y2xwejhhaDhlM2NxYmtpMDNkdzlwNmJnMHFtNmU3OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6qj3i9pMzObio/giphy.gif" },
  { name: "Dessert", image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps21585_THCA153054D10_15_4b.jpg",gif:"https://media.giphy.com/media/pmaRPzw1v6zKM/giphy.gif?cid=790b7611cti4j5utd6a14hdfrlbqnawa852lxtx1xrm2n3ej&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { name: "Sandwich", image: "https://www.rd.com/wp-content/uploads/2016/03/aol-food-perfect-sandwich-ft.jpg" ,gif:"https://media.giphy.com/media/c6a2kiRrF0Pbq/giphy.gif?cid=ecf05e47faos8df8ln6gtj8l47susmvwqxetduyasbvijyyk&ep=v1_gifs_search&rid=giphy.gif&ct=g"},
  { name: "Cake", image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k/Edit/2023-01-Chocolate-Strawberry-Cakes/chocolate-strawberry-cake-1",gif:"https://media.giphy.com/media/osSO5tUr7m7gA/giphy.gif?cid=ecf05e47mfawshair0lmxu9m506bk3o2cnx6x47xulmu5j36&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { name: "Pure Veg", image: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/u/f/p104827-16484714136241ad75dfa4d.jpg?tr=tr:n-xlarge",gif:"https://media.giphy.com/media/3atYlU9uHVBx82vnUR/giphy.gif?cid=790b76119m0vgt4yedl0oeuy8o9od5bgtdo15uunbifziwfm&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { name: "Pasta", image: "https://th.bing.com/th/id/OIP.GqLLcYyiMo6MRlBuJQ8JFwHaLH?rs=1&pid=ImgDetMain",gif:"https://media.giphy.com/media/13AJJwFqUsdoWY/giphy.gif?cid=790b76118stjp3wcurt1dfe5lshab4e75tt52r14l4sgyjj9&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { name: "Noodles", image: "https://thebigmansworld.com/wp-content/uploads/2022/11/korean-spicy-noodles2.jpg",gif:"https://media.giphy.com/media/Z2IoReHYnRxyU/giphy.gif?cid=790b7611d2j08vquc0tn3b8y4tu33a1mr7bgn0z9surbx61r&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
].map((item, index) => (
  <Box
    key={index}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    sx={{
      width: { xs: "22%", sm: "23%", md: "15%", lg: "10%" },
      height: { xs: "100px", sm: "190px", md: "200px" },
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'space-around',
      position: "relative",
    }}
  >
    {/* Image circle */}
    <Box
  onClick={() => navigate('/ExploreMenu', { state: { category: item.name } },console.log(item.name))}
  sx={{
    width: "100%",
    height: "65%",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
  }}
>

      {/* Static background image */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "opacity 0.3s ease-in-out",
          opacity: hoveredIndex === index ? 0 : 1,
        }}
      />
      {/* Fake GIF layer (can swap with real GIF) */}
      {hoveredIndex === index && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.gif})`, // Replace with real gif link if you have
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        />
      )}
    </Box>

    {/* Name */}
    <Typography sx={{ color: "grey", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
      {item.name}
    </Typography>
  </Box>
))}

            </Box>