// components/ProductList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack, Typography, Button, TextField, Box, Avatar, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonIcon from '@mui/icons-material/Person';
import shopping from '../Images/shopping2.jpg';
import img1 from '../Images/vegetables1.webp';
import img2 from '../Images/chicken1.jpg';
import img3 from '../Images/fritus1.jpg';
import img4 from '../Images/milk1.png';
import img5 from '../Images/snacks1.jpg'
import Cart from './Cart';






const Details = [
    { id: 1, name: 'Vegetables ', image: img1, price: '17$' },
    { id: 2, name: 'cheken Legs', image: img2, price: '20$' },
    { id: 3, name: 'fruits', image: img3, price: '20$' },
    { id: 4, name: 'milk & Dairy', image: img4, price: '20$' },

]


const ProductList = () => {
    const containerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
   const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

    const navigate = useNavigate();
    const cartPage = () => {
        navigate("/cart")
    }

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 3;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };
    const normalizeFilePath = (filePath) => {
        console.log(filePath)
        return filePath.replace(/\/{2,}/g, '/');
    }




    const [products, setProducts] = useState([]);


    useEffect(() => {
        document.body.style.zoom = "90%";

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8091/getAllmages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const imageData = await response.json();
                setProducts(imageData);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <Grid container spacing={2} alignItems={'center'} backgroundColor="#355E3B" padding="5px">
                <Grid item xs={1} sm={6} md={1.5} >
                    <MenuIcon sx={{ color: 'whitesmoke' }} />
                </Grid>
                <Grid item xs={5} sm={6} md={1.9}>
                    <Stack direction={'row'}>
                        <ShoppingCartIcon sx={{ color: 'whitesmoke' }} />
                        <Typography sx={{ color: 'whitesmoke' }}>YM Grocery</Typography>
                    </Stack>
                </Grid >
                <Grid item xs={4} sm={6} md={4} >
                    <TextField
                        type="text"
                        size='small'
                        placeholder="Search for Grocery Stores vegetable or meat"
                        style={{
                            width: "100%",
                            height: "40px",
                        }}
                        InputProps={{
                            style: {
                                fontSize: '16px',
                                borderRadius: '18px',
                                backgroundColor: 'whitesmoke'
                            },
                            endAdornment: (
                                <SearchIcon sx={{ color: 'lightgray' }} />
                            ),
                        }}

                    />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Stack direction={'row'}>
                        <BoltIcon sx={{ color: '#e6ae25' }} />
                        <Typography sx={{ color: 'whitesmoke' }}>
                            order now and get it within
                            <span style={{ color: 'yellow' }}>15min</span>
                        </Typography>
                    </Stack>

                </Grid>
                <Grid item xs={3} sm={6} md={0.5} sx={{ margin: '0', padding: '0' }} >
                    <Avatar sx={{ backgroundColor: "white" }}>
                        <ShoppingCartIcon sx={{ color: "lightgreen" }} onClick={cartPage} />
                    </Avatar>
                </Grid>
                <Grid item xs={3} sm={6} md={0.9} >
                    <Avatar>
                        <Avatar sx={{ backgroundColor: 'white' }}>
                            <PersonIcon sx={{ color: "lightgreen" }} />
                        </Avatar>
                    </Avatar>
                </Grid>
            </Grid>
            <Box>
                <img src={shopping} style={{ height: '250px', width: '100%' }} alt="Shopping Logo" />
            </Box>
            <div
                ref={containerRef}
                style={{
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                    width: '100%',
                    scrollBehavior: 'auto',
                    cursor: 'pointer',
                }}

                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {products.map((product, index) => (
                        <Grid
                            key={product.id}
                            item
                            xs={6}
                            sm={6}
                            md={2}
                            style={{
                                flex: '0 0 auto',
                                maxWidth: '50%',
                                minWidth: '200px',
                            }}
                        >
                            <Card style={{ width: '100%' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        // width="5%"
                                        src={product.filepath}
                                        alt="Product Image"
                                    />
                                    <CardContent>
                                        <Typography>{product.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Typography variant='h6' sx={{ justifyContent: "flex-start", display: 'flex', ml: '4%' }}> you might need</Typography>
            <Grid container spacing={0}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                }}>
                {Details.map((ProductDetails) => (
                    <Grid
                        key={ProductDetails.id}
                        item
                        xs={6}
                        sm={6}
                        md={3}

                        style={{
                            display: 'flex',
                            maxWidth: '50%',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            minWidth: '100px',

                        }}
                    >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    src={ProductDetails.image}
                                    alt="Product Image"
                                />
                                <CardContent>
                                    <Typography variant='h6'>{ProductDetails.name}</Typography>
                                    <Typography variant='h6'>(Local Shop)</Typography>
                                    <Typography>{ProductDetails.price}</Typography>
                                    <Button variant='outlined' onClick={() => addToCart(ProductDetails)}>
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </CardActionArea>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={3000}
                                onClose={handleSnackbarClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                                    Added to cart successfully!
                                </Alert>
                            </Snackbar>
                        </Card>
                    </Grid>
                ))}
            </Grid>





            {/* <img src="your_image_url_1.jpg" alt="Image 1" style={{ width: '100%', marginBottom: '20px' }} />
                <img src="your_image_url_2.jpg" alt="Image 2" style={{ width: '100%', marginBottom: '20px' }} />
                Adding other content
                <Typography>
                    Your text content goes here. You can add more images, text, or other components within this Box.
                </Typography>
                </Box>
                <h1>Product List</h1>
                {products.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        {cartItems.some(item => item.id === product.id) ? (
                            <p>Item is in cart</p>
                        ) : (
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        )}
                    </div>
                ))} */}
        </div >
    );
};

export default ProductList;
