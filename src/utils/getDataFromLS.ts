import calcTotalCount from "./calcTotalCount";
import calcTotalPrice from "./calcTotalPrice";

const getDataFromLS = () => {
  const data = localStorage.getItem('pizzas');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);
  
  return {
    items,
    totalPrice,
    totalCount
  }
}

export default getDataFromLS;