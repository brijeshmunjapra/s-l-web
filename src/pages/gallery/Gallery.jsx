import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Our_Gallery from '../../component/sections/GalleryComponent/Our_Gallery/Our_Gallery'
import Slider_right from '../../component/sections/GalleryComponent/Sliders-right/Slider_right'
import Slider_Left from '../../component/sections/GalleryComponent/Sliders-Left/Sliders-Left'
import { fetchGallerySliders } from '../../store/slices/gallerySlidersSlice'

const Gallery = () => {
    const dispatch = useDispatch()
    const { sliders, loading, error } = useSelector(state => state.gallerySliders)

    useEffect(() => {
        dispatch(fetchGallerySliders())
    }, [dispatch])

    // Function to render the appropriate slider component based on sliderType
    const renderSlider = (slider) => {
        const commonProps = {
            coupleName: slider.coupleName,
            shortDescription: slider.shortDescription,
            images: slider.images
        }

        if (slider.sliderType === 'RIGHT') {
            return <Slider_right key={slider.id} {...commonProps} />
        } else if (slider.sliderType === 'LEFT') {
            return <Slider_Left key={slider.id} {...commonProps} />
        }
        return null
    }

    return (
        <>
            <Our_Gallery/>
            {loading && <div>Loading sliders...</div>}
            {error && <div>Error loading sliders: {error}</div>}
            {sliders.map(slider => renderSlider(slider))}
        </>
    )
}

export default Gallery