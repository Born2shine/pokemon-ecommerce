const STORAGE_KEY = "cart";

export const getCartItems = () => {
  try {
    const cartStorage = localStorage.getItem(STORAGE_KEY);
    if(!cartStorage){
      return []
    }
    return JSON.parse(cartStorage);
  } catch (e) {
    return [];
  }
};

export const findItem = (name) => {
  const cartStorage = getCartItems();
  return cartStorage.find((cart) =>  cart.name === name)
}

export const incrementCartItem = (ITEM_NAME) => {
  const cartStorage = getCartItems();
  const newCartStorage = cartStorage.map((cart) => {
    if(cart.name === ITEM_NAME){
      return {...cart, quantity: parseInt(cart.quantity, 10) + 1} ;
    }
    return cart
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCartStorage));
  return newCartStorage
}

export const addToCart = (item) => {
  const cartStorage = getCartItems();
  const foundItem = findItem(item.name);
  if(foundItem){
    incrementCartItem(item.name)
    return
  }
  cartStorage.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartStorage));
};

export const removeFromCart = (name) => {
  const cartStorage = getCartItems();
  const filteredCart = cartStorage.filter((c) => c.name !== name);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCart));
  return filteredCart;
};


export const decrementCartItem = (ITEM_NAME) => {
  const cartStorage = getCartItems();
  const newCartStorage = cartStorage.map((cart) => {
    if(cart.name === ITEM_NAME){
      return {...cart, quantity: parseInt(cart.quantity, 10) - 1} ;
    }
    return cart
  }).filter((c) => c.quantity !== 0)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCartStorage));
  return newCartStorage
}
