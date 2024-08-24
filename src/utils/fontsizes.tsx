export const getFontSize = (type: string): string => {
    switch (type) {
        case 'title':
            return '48px'
        case 'large':
            return '28px'
        case 'medium':
            return '16px'
        case 'small':
            return '12px'
        default: 
            return '12px'
    }
}
