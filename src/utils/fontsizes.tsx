export const getFontSize = (type: string): string => {
    switch (type) {
        case 'title':
            return '32px'
        case 'large':
            return '20px'
        case 'medium':
            return '14px'
        case 'small':
            return '12px'
        default: 
            return '12px'
    }
}
