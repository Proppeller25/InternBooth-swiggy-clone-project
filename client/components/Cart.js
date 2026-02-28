const Cart = JSON.parse(localStorage.getItem('Cart')) || []

function SaveItem (item, name) {
  localStorage.setItem(`${name}`, JSON.stringify(item))
}

export {Cart, SaveItem}