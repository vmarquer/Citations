export const getImage = (name: string | undefined, width: string, height: string) => {
    const imageStyle = { width: width, height: height };

    if (name) {
        return <img src={`/img/${name}`} alt={`${name}`} style={imageStyle} />;
    } else {
        return <div>No image</div>;
    }
};