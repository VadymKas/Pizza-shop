const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce(
        (sum, product) => sum + product.price * product.count,
        0,
    );
};

export default calcTotalPrice;
