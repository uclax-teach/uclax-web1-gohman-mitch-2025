import PropTypes from "prop-types";

const Slide = ({ slide }) => {
    const { title, src } = slide;

    return (
        <div>
            <img src={src} alt={title} />
            <p className="legend">{title}</p>
        </div>
    );
};

export default Slide;

// prop-types
Slide.propTypes = {
    slide: PropTypes.object.isRequired,
};
