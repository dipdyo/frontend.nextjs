import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      router.push('/success')
    } else {
      console.error('Registration failed')
    }
  }

  return (
    <>
      <Head>
        <title>Login Masuk</title>
        <meta name="description" content="User registration page" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-indigo-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-center mb-6">
            <Image src="/Logo_djp.png" alt="DJP Logo" width={50} height={50} className="mr-3" />
            <h2 className="text-2xl font-semibold text-center text-yellow-400">Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {['Email', 'Password'].map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
