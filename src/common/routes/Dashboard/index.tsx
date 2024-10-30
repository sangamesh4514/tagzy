import { Search } from "lucide-react"
import { ChangeEvent, useState, FormEvent } from "react"
import UserProfileCard from "../../../components/UserProfile"
import Header from "../../components/Header"

const Dashboard: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [inputNumber, setInputNumber] = useState<string>('')

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(inputNumber.trim()) {
      setPhoneNumber(inputNumber)
    }
  }

  return (
    <div>
      <Header />
      <div className="mx-10 max-w-full">
        <form onSubmit={handleFormSubmit} className="flex items-center border rounded-lg overflow-hidden shadow-sm mt-4">
          <input 
            type="text" 
            placeholder="Search user by phone number..."
            value={inputNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputNumber(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={10}
          />
          <button
            type="submit"
            className="p-2 bg-colorA hover:colorB transition"
            style={{color: "white", display: 'flex', gap: '10px', alignItems: 'center'}}
          >
            Search<Search />
          </button>
        </form>
      </div>
      <div>
        <UserProfileCard phoneNumber={phoneNumber} />
      </div>
    </div>
  )
}

export default Dashboard