export const idGenerator = () => {
    return (Math.round(Math.random() + Date.now())).toString()
}

