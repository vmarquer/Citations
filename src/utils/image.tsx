import MovieIcon from '@mui/icons-material/Movie';

export const getImage = (name: string | undefined, width: string, height: string) => {
    const imageStyle = { width: width, height: height };

    if (name) {
        return <img src={`${process.env.PUBLIC_URL}/img/${name}`} alt={`${name}`} style={imageStyle} />;
    } else {
        return <MovieIcon/>;
    }
};