let Cart = JSON.parse(localStorage.getItem('Cart')) || []

function SaveItem (item, name) {
  localStorage.setItem(`${name}`, JSON.stringify(item))
}

const calculateTotal = () => {
    let total = 0
    Cart.forEach((item) => {
      total = total + ((item.price * item.items) * 1300)
    })
    return total
  }
  
  function alterQuantity (action, id) {
    const containerDiv = document.querySelector(`#quantityContainer`)
    const reduceButton = document.querySelector('#reduceButton')
    const addButton = document.querySelector('#addButton')
    const quantityDiv = document.querySelector(`#quantityDiv-${id}`)
    const priceDiv = document.querySelector(`#priceDiv-${id}`)
    const subTotalDiv = document.querySelector('#subTotalDiv')
    const grandTotalDiv = document.querySelector('#grandTotalDiv')
    const deliveryFeesDiv = document.querySelector('#deliveryFeesDiv')

    
    containerDiv.dataset.id = id
    Array.from(containerDiv.children).forEach((child) => {
      child.dataset.id = id
    })

    if(action === 'add') {
      if (addButton.dataset.id === quantityDiv.dataset.id) {
        const founditem = Cart.find(item => item.id === id)
        founditem.items++
        quantityDiv.textContent = founditem.items
        priceDiv.textContent = `₦ ${((founditem.price * founditem.items) * 1300).toLocaleString()}`
        grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
        subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
        deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
        console.log(founditem)
      }
    }

    if (action === 'reduce'){
      if (reduceButton.dataset.id === quantityDiv.dataset.id) {
        const founditem = Cart.find(item => item.id === id)
        founditem.items--
        if(founditem.items > 0){
          quantityDiv.textContent = founditem.items
          priceDiv.textContent = `₦ ${((founditem.price * founditem.items) * 1300).toLocaleString()}`
          grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
          subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
          deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
        }

        if (founditem.items < 1) {
          Cart = Cart.filter(item => item.id !== founditem.id)
          grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
          subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
          deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
          containerDiv
          console.log(founditem, Cart)
          containerDiv.remove()
        }
      }
    }
    
  }

export {Cart, SaveItem, calculateTotal, alterQuantity}