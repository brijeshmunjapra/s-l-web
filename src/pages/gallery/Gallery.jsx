import React from 'react'
import Our_Gallery from '../../component/sections/GalleryComponent/Our_Gallery/Our_Gallery'
import Slider_right from '../../component/sections/GalleryComponent/Sliders-right/Slider_right'
import Slider_Left from '../../component/sections/GalleryComponent/Sliders-Left/Sliders-Left'


const Gallery = () => {
    return (
        <>      
               <Our_Gallery/> 
               <Slider_right/>
               <Slider_Left/>
               <Slider_right/>
               <Slider_Left/>
               
        </>
    )
}

export default Gallery