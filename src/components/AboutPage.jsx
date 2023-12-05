import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import Grid from '@mui/material/Grid'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image1 from '../Pictures/1.jpg';
import Image2 from '../Pictures/2.jpg';
import Image3 from '../Pictures/3.jpg';

export default function AboutPage() {
  const images = [Image1, Image2, Image3];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    const calculateAspectRatio = () => {
      const img = new Image();
      img.src = Image1;
      img.onload = () => {
        const ratio = img.height / img.width;
        setAspectRatio(ratio);
      };
    };

    calculateAspectRatio();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  
    if(!isSmallScreen){
  return (
    <Box>
        <Grid container sx={[{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center"}]}>
                <Grid item xs={2} ></Grid>
            <Grid item xs={4} >
                <Box sx={{maxWidth:400, maxHeight:300, marginRight:2}}>
                    <Typography sx={{fontFamily: 'Nova Square, sans-serif', fontSize:20}}>
                        This site is for creating easy eshop page. It's really easy, just add categories, 
                        add all items to categories that you want, and that is it, you are ready to go. 
                        If you want something special on the page, just contact admins and it will be added as soon as possible. 
                        More functionality will be added later.
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4} >
                <Box sx={{ maxWidth: 400, maxHeight: 300 / aspectRatio}}>
                    <Slider {...settings}>
                        {images.map((image, index) => (
                        <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        style={{ width: '100%', height: `100%`, objectFit: 'cover' }}
                    />
                        ))}
                    </Slider>
                </Box>
            </Grid>
            <Grid item xs={2} ></Grid>
        </Grid>
    </Box>
  );} else {
  return (
        <Box>
            <Box sx={{maxWidth:400, maxHeight:300, marginRight:2, marginBottom:5, marginTop:3}}>
                <Typography sx={{fontFamily: 'Nova Square, sans-serif', fontSize:20}}>
                    This site is for creating easy eshop page. It's really easy, just add categories, 
                    add all items to categories that you want, and that is it, you are ready to go. 
                    If you want something special on the page, just contact admins and it will be added as soon as possible. 
                    More functionality will be added later.
                </Typography>
            </Box>
            <Box sx={{ maxWidth: 400, maxHeight: 300 / aspectRatio, marginBottom:3}}>
                <Slider {...settings}>
                    {images.map((image, index) => (
                    <img
                    key={index}
                    src={image}
                    alt={`Slide ${index}`}
                    style={{ width: '100%', height: `100%`, objectFit: 'cover' }}
                />
                    ))}
                </Slider>
            </Box>
        </Box>
      );  
  }
}
