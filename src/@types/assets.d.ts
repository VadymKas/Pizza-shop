declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export default content;
}
declare module 'lodash.debounce' {
    const content: any;
    export default content;
}

type PizzaObj = {
    imageUrl: string;
    title: string;
    price: number;
};

type CartItemType = {
    id: string;
    title: string;
    type: string;
    price: number;
    count: number;
    size: number;
    imageUrl: string;
};