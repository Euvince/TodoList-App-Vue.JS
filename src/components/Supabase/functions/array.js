
export function shuffleArray (arr) {
    return arr
        .map((item) => ({
            value : item,
            sort : Math.random(),
            sortt : Math.round(Math.random())
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((item) => item.value)
}