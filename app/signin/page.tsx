import Nav from '@/components/Nav'
import LoginForm from '@/features/authentication/login1'
import React from 'react'

const page = () => {
  return (
    <>
    <LoginForm />
    </>
  )
}

export default page

export async function generateMetadata(){
  return{
    title:`Login | Technical sewa`
  }
}