import { useState, useEffect } from "react";

// api
import axios from "@Core/axios";

// components
import CoreSlideshow from "@Core/components/Slideshow";
import Preloader from "@Core/components/Preloader";

const Slideshow = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchTabs = async () => {
            const resp = await axios.get(`/slides`);
            setSlides(resp.data);
        };
        fetchTabs();
    }, []);

    if (slides.length === 0) return <Preloader />;

    return <CoreSlideshow slides={slides} />;
};

export default Slideshow;
