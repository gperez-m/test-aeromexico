const { innerWidth: width} = window;

export const isMobile = () => {
    return width <= 432;
}