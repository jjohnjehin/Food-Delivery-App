<Box sx={{ width: '100%', height: "50px", display: 'flex', justifyContent: "center" }}>
                <Grid sx={{ width: "83%", height: "100%" }}>
                    <Typography variant="h5" sx={{ fontWeight: "600" }}>Explore our menu</Typography>
                </Grid>
            </Box>

            {/* Menu Items */}
            <Box sx={{width: "83%",height: "auto",display: "flex",flexWrap: "wrap",justifyContent: "center",gap: { xs: 1.5, sm: 2, md: 3 },}}>
                {[
                    { name: "Salad", image: "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Italian-Fresh-Vegetable-Salad_EXPS_HCAPB22_86057_P2_MD_06_29_7b.jpg" },
                    { name: "Rolls", image: "https://th.bing.com/th/id/OIP.sGcCXwOzsqdNddlSfxHNnAHaLG?w=1067&h=1600&rs=1&pid=ImgDetMain" },
                    { name: "Desert", image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps21585_THCA153054D10_15_4b.jpg" },
                    { name: "Sandwich", image: "https://www.rd.com/wp-content/uploads/2016/03/aol-food-perfect-sandwich-ft.jpg" },
                    { name: "Cake", image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k/Edit/2023-01-Chocolate-Strawberry-Cakes/chocolate-strawberry-cake-1" },
                    { name: "Pure Veg", image: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/u/f/p104827-16484714136241ad75dfa4d.jpg?tr=tr:n-xlarge" },
                    { name: "Pasta", image: "https://th.bing.com/th/id/OIP.GqLLcYyiMo6MRlBuJQ8JFwHaLH?rs=1&pid=ImgDetMain" },
                    { name: "Noodles", image: "https://thebigmansworld.com/wp-content/uploads/2022/11/korean-spicy-noodles2.jpg" },
                ].map((item, index) => (
                    <Box key={index} sx={{width: { xs: "22%", sm: "23%", md: "15%",lg:"10%" }, height: { xs: "100px", sm: "190px", md: "200px" },display: 'flex',flexDirection: "column",alignItems: 'center',justifyContent: 'space-around'}}>
                        <Box sx={{width: "100%",height: "65%",borderRadius: "50%",backgroundImage: `url(${item.image})`,backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat"}} />
                            <Typography sx={{color: "grey",fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{item.name}</Typography>
                    </Box>
                    ))}
            </Box>

            {/* Separator Line */}
            <Box sx={{ width: "83%", borderBottom: "1px solid grey", marginTop: "20px" }} />
            <Box sx={{ width: '100%', height: "50px", display: 'flex', justifyContent: "center",marginTop:"30px" }}>
                <Grid sx={{ width: "83%", height: "100%" }}>
                    <Typography variant="h5" sx={{ fontWeight: "600" }}>Top dishes near you</Typography>
                </Grid>
            </Box>

            {/* Food Section */}
            <Box
            sx={{ width: "83%", display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px", justifyContent: { xs: "center", sm: "space-between", md: "space-between" } }}
        >
            {data.slice(0,15).map((item, index) => (
                <Card key={index} sx={{ width: { lg: "220px", sm: "200px", xs: "300px" }, height: "380px", borderRadius: "10px", boxShadow: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "30px", position: "relative" }}>
                    <CardMedia component="img" sx={{ height: "180px", objectFit: "cover" }} image={item.image} alt={item.dish_name} />
                    {cart[index] && activeIndex === index ? (
                        <Box className="drawer-container" sx={{ position: "absolute", left: "50%", top: "150px", transform: "translateX(-50%)", display: "flex", alignItems: "center", bgcolor: "rgba(0, 0, 0, 0.7)", padding: "5px 10px", borderRadius: "10px" }}>
                            <IconButton onClick={() => handleRemoveClick(index, item)}>
                                <RemoveCircleIcon sx={{ color: "red" }} />
                            </IconButton>
                            <Typography sx={{ color: "white", mx: 1 }}>{cart[index]}</Typography>
                            <IconButton onClick={() => handleAddClick(index, item)}>
                                <AddCircleIcon sx={{ color: "green" }} />
                            </IconButton>
                        </Box>
                    ) : (
                        <AddCircleIcon sx={{ position: "absolute", left: "190px", top: "150px", color: "white", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); handleAddClick(index, item); }} />
                    )}
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.restaurant_name}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{item.dish_name}</Typography>
                        <Typography variant="body2">⭐ {item.rating}</Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic" }}>{item.slogan}</Typography>
                        <Typography variant="h6" sx={{ color: "green", marginTop: "10px" }}>{item.price}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
        