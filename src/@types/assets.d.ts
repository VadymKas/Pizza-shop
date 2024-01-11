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

type PizzaProps = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

type CartItem = {
    id: string;
    title: string;
    type: string;
    price: number;
    count: number;
    size: number;
    imageUrl: string;
};

//REDUX TYPES

type CartSliceState = {
    totalPrice: number;
    totalCount: number;
    items: CartItem[];
};

type Sort = {
    name: string;
    sortBy: 'rating' | 'price' | 'title';
    sortOrder: 'desc' | 'asc';
};

type SearchParams = {
    sortBy: string;
    order: string;
    searchCategory: string;
    searchName: string;
    page: string;
};

type FilterSliceState = {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
};

type FetchParams = Record<string, string>;

type PizzaSliceState = {
    items: CartItem[];
    status: 'loading' | 'success' | 'error';
};
