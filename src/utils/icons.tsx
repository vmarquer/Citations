export const getIconStyle = (type: string): { width: string, height: string} => {
    switch (type) {
        case 'large':
            return { width: "30px", height: "30px" }
        case 'medium':
            return { width: "20px", height: "20px" };
        case 'small':
            return { width: "10px", height: "10px" };
        default: 
            return { width: "20px", height: "20px" };
    }
}