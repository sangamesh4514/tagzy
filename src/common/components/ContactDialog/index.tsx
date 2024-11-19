'use client'

import { useState, useEffect, useRef } from "react"
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/magicUi/ui/dialog"
import { Input } from "src/magicUi/ui/input"
import { Label } from "src/magicUi/ui/label"
import { Textarea } from "src/magicUi/ui/textarea"
import { Mail } from "lucide-react"
import emailjs from '@emailjs/browser';
import './style.css';

interface FormData {
  name: string
  email: string
  city: string
  query: string
}

interface IProps{
    headerView?: boolean;
  }

export default function ContactDialog(props: IProps) {
  const { headerView = false } = props
  const [open, setOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    city: '',
    query: ''
  })
  const formRef = useRef<HTMLFormElement>(null);

  //Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isFormValid = () => {
    return (
      formData.name.trim().length > 0 &&
      isValidEmail(formData.email) &&
      formData.city.trim().length > 0 &&
      formData.query.trim().length > 0
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentForm = formRef.current

    if(currentForm === null) return
    if (isFormValid()) {
      emailjs
        .sendForm(
          'service_5wa3w5j',
          'template_90dytdq',
          currentForm,
          'xZiE81yyC9gBEedO8'
        )
        .then((result) => {
          console.log('===Form submitted:', result)
          setIsSubmitted(true)
          setTimeout(() => {
            setIsSubmitted(false)
            setOpen(false)
            setFormData({
              name: '',
              email: '',
              city: '',
              query: ''
            })
          }, 2000)
        })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if (!open) {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        city: '',
        query: ''
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`${!headerView ? "contact-trigger-btn" : 'headerView'} hover:text-colorA cursor-pointer`} style={{ letterSpacing: '-1px', wordSpacing: '-5px' }}>
          Contact Us
        </div>
      </DialogTrigger>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Contact Us</DialogTitle>
        </DialogHeader>
        {!isSubmitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <Label htmlFor="name" className="form-label">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <Label htmlFor="email" className="form-label">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <Label htmlFor="city" className="form-label">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <Label htmlFor="query" className="form-label">Your Query</Label>
              <Textarea
                id="query"
                name="query"
                placeholder="Type your message here"
                value={formData.query}
                onChange={handleChange}
                required
                className="form-textarea"
              />
            </div>
            <div className="form-actions">
              <Button
                type="button"
                className="close-btn bg-teal"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="submit-btn"
                disabled={!isFormValid()}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="thank-you-message">
            <Mail className="mail-icon" />
            <p>Thank you for your submission!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}