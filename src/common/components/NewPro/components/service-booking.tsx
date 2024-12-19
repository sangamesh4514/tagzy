'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import './service-booking.css'
import { Button } from '../../ui/button'
import { Calendar } from 'src/magicUi/ui/calendar'

interface Addon {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function ServiceBooking() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [addons, setAddons] = useState<Addon[]>([
    {
      id: 1,
      name: "Blood Test",
      price: 150,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ])

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM"
  ]

  const relatedAddons = [
    { id: 2, name: "X-Ray", price: 300, image: "/placeholder.svg" },
    { id: 3, name: "ECG", price: 200, image: "/placeholder.svg" },
    { id: 4, name: "Urine Test", price: 100, image: "/placeholder.svg" }
  ]

  const updateQuantity = (id: number, increment: boolean) => {
    setAddons(addons.map(addon => 
      addon.id === id 
        ? { ...addon, quantity: increment ? addon.quantity + 1 : Math.max(1, addon.quantity - 1) }
        : addon
    ))
  }

  const deleteAddon = (id: number) => {
    setAddons(addons.filter(addon => addon.id !== id))
  }

  const total = addons.reduce((sum, addon) => sum + (addon.price * addon.quantity), 500) // Base price + addons

  return (
    <div className="service-booking">
      <header className='service-booking-header'>
        <button className="back-button">
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>
        <button className="cart-button">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </header>

      <main>
        <section className="service-section">
          <h2 className='service-section-h2'>Service :-</h2>
          <div className="service-card">
            <div className="service-image">
              <img
                src="/placeholder.svg"
                alt="Health checkup"
                width={100}
                height={100}
              />
            </div>
            <h3>Health checkup</h3>
            <span className="price">₹500</span>
          </div>
        </section>

        <section className="addons-section">
          <h2>Addons :-</h2>
          {addons.map(addon => (
            <div key={addon.id} className="addon-card">
              <img
                src={addon.image}
                alt={addon.name}
                width={80}
                height={80}
              />
              <div className="addon-info">
                <h4>{addon.name}</h4>
                <p>Price * Quantity</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(addon.id, false)}>
                  <Minus className="w-4 h-4" />
                </button>
                <span>{addon.quantity}</span>
                <button onClick={() => updateQuantity(addon.id, true)}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                className="delete-button"
                onClick={() => deleteAddon(addon.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <span className="price">₹{addon.price * addon.quantity}</span>
            </div>
          ))}
        </section>

        <div className="total">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        <section className="related-addons">
          <h2>Add Addons Related to this Service :-</h2>
          <div className="related-addons-grid">
            {relatedAddons.map(addon => (
              <div key={addon.id} className="related-addon-card">
                <img
                  src={addon.image}
                  alt={addon.name}
                  width={80}
                  height={80}
                />
                <div className="addon-info">
                  <h4>{addon.name}</h4>
                  <p>₹{addon.price}</p>
                </div>
                <Button variant="outline">Add</Button>
              </div>
            ))}
          </div>
        </section>

        <section className="booking-section">
          <div className="date-picker">
            <h2>Select a Date:</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="time-slots">
            <h2>Select a Time Slot:</h2>
            <div className="time-grid">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="time-slot-button"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <h3>Almost There</h3>
          <p>Login or Signup to place your order</p>
          <Button className="proceed-button">
            Proceed with phone number
          </Button>
        </div>
      </footer>
    </div>
  )
}

