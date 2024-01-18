import { useState, useEffect } from 'react'
import '../styles/Cart.css'
import croix from '../assets/croix.png'

function Cart({ cart, updateCart }) {
    const [isOpen, setIsOpen] = useState(true)
    const total = cart.reduce(
        (acc, plantType) => acc + plantType.amount * plantType.price,
        0
    )
    const deleteItem = index => {
        let newCart = [...cart]
        if (newCart[index].amount === 1) {
            newCart = newCart.filter((item, i) => i !== index)
        } else {
            newCart[index].amount -= 1
        }
        updateCart(newCart)
    }

    useEffect(() => {
        document.title = `LMJ: ${total}€ d'achats`
    }, [total])

    return isOpen ? (
        <div className='lmj-cart'>
            <button
                className='lmj-cart-toggle-button'
                onClick={() => setIsOpen(false)}
            >
                Fermer
            </button>
            {cart.length > 0 ? (
                <div>
                    <h2>Panier</h2>
                    <ul>
                        {cart.map(({ name, price, amount }, index) => (
                            <div key={`${name}-${index}`}>
                                {name} {price}€ x {amount} <img className='lmj-delete-element' src={croix} onClick={() => deleteItem(index)} alt='croix pour supprimer élement'></img>
                            </div>
                        ))}
                    </ul>
                    <h3>Total :{total}€</h3>
                    <button onClick={() => updateCart([])}>Vider le panier</button>
                </div>
            ) : (
                <div>Votre panier est vide</div>
            )}
        </div>
    ) : (
        <div className='lmj-cart-closed'>
            <button
                className='lmj-cart-toggle-button'
                onClick={() => setIsOpen(true)}
            >
                Ouvrir le Panier
            </button>
        </div>
    )
}

export default Cart