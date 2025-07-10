"use client"
import React, { useEffect, useState } from "react"
import { AiOutlineClockCircle } from "react-icons/ai"
import qr from "../../../public/siddhartha.jpg"
import Image from "next/image"
const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60)
    const secondsLeft = seconds % 60
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5 bg- gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        {/* <img src="../../../assets/qr/siddhartha.jpg" alt="qr code" /> */}
        <Image src={qr} alt="QR code for payment" width={300} height={300} />
        <h2 className="text-xl font-semibold mt-4">Scan to Pay</h2>
        <div className="flex items-center mt-4 text-red-500">
          <AiOutlineClockCircle className="text-2xl mr-2" />
          <span className="text-xl font-semibold">{formatTime(timeLeft)}</span>
        </div>
        <p className="text-gray-500 mt-2">
          You have 10 minutes to complete the payment.
        </p>
      </div>
    </div>
  )
}

export default PaymentPage
