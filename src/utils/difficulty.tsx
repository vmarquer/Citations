export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "1":
            return "green"
        case "2":
            return "yellow"
        case "3":
            return "red"
        default:
            return "black"
    }
}