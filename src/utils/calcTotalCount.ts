const calcTotalCount = (items: CartItem[]) => {
    return items.reduce((acc, item) => acc + item.count, 0);
};

export default calcTotalCount;
