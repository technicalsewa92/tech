// "use client"
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import Image from "next/image"
// import { useEffect, useState } from "react"
// import user from "../../public/dummy-user.png"
// import Link from "next/link"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchUserProfile } from '@/store/userSlice'
// import { AppDispatch, RootState } from '@/store/store'

// interface CustomerData {
//   first_name?: string
//   last_name?: string
//   email?: string
//   mobile_number?: string
//   password?: string
//   photo?: File | string
//   shipping_address1?: string
//   shipping_address2?: string
//   shipping_address3?: string
// }

// export default function UserProfile() {
//   const [data, setData] = useState<CustomerData | null>(null)
//   const [initialData, setInitialData] = useState<CustomerData | null>(null)
//   const [formData, setFormData] = useState<FormData | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const [editing, setEditing] = useState<boolean>(false) // New state for editing mode
//   const dispatch = useDispatch<AppDispatch>()
//   const userProfile = useSelector((state: RootState) => state.user.profile)

//   useEffect(() => {
//     dispatch(fetchUserProfile())
//   }, [dispatch])

//   useEffect(() => {
//     if (userProfile) {
//       console.log("userProfile", userProfile)
//       const userData = {
//         first_name:
//           userProfile.first_name || userProfile.sc_name?.split(" ")[0] || "",
//         last_name:
//           userProfile.last_name || userProfile.sc_name?.split(" ").at(-1) || "",
//         email: userProfile.email || userProfile.sc_email || "",
//         mobile_number: userProfile.mobile_number || userProfile.mobile || "",
//         shipping_address1: userProfile.shipping_address1 || "",
//         shipping_address2: userProfile.shipping_address2 || "",
//         shipping_address3: userProfile.shipping_address3 || "",
//         photo: userProfile.photo || "",
//       }
//       console.log("userData", JSON.stringify(userData))
//       setData(userData)
//       setInitialData(userData)
//       setLoading(false)
//     }
//   }, [userProfile])

//   useEffect(() => {
//     if (data) {
//       const id = localStorage.getItem("id") || ""
//       const userType = localStorage.getItem("type") || ""
//       const form = new FormData()
//       // form.append("cust_id", id)

//       if (userType == "Technician") {
//         form.append("id", id)
//         form.append("mobile", data.mobile_number || "")
//         // console.log("idrun", id);
//       } else {
//         form.append("cust_id", id)
//         form.append("phone", data.mobile_number || "")
//       }
//       form.append("firstname", data.first_name || "")
//       form.append("lastname", data.last_name || "")
//       form.append("email", data.email || "")
//       form.append("shipping_address1", data.shipping_address1 || "")
//       form.append("shipping_address2", data.shipping_address2 || "")
//       form.append("shipping_address3", data.shipping_address3 || "")
//       form.append("photo", data.photo || "")
//       setFormData(form)
//     }
//   }, [data])

//   const hasChanges = () => {
//     if (!data || !initialData) return false
//     return (
//       data.first_name !== initialData.first_name ||
//       data.last_name !== initialData.last_name ||
//       data.email !== initialData.email ||
//       data.mobile_number !== initialData.mobile_number ||
//       data?.photo !== initialData.photo
//     )
//   }

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()

//     if (!hasChanges()) {
//       // console.log("No changes to save.")
//       return
//     }

//     if (!formData) {
//       console.error("Form data is not ready.")
//       return
//     }

//     try {
//       console.log("formdata", formData)
//       console.log("data", JSON.stringify(data))
//       // const response = await fetch(
//       //   "https://www.technicalsewa.com/techsewa/publiccontrol/updateCustomer",
//       //   {
//       //     method: "POST",
//       //     body: formData,
//       //     headers: {
//       //       "Content-Type": "multipart/form-data",
//       //     },
//       //   },
//       // )

//       const type = localStorage.getItem("type") || ""
//       const endpointType =
//         type === "Technician" ? "updateTechnician" : "updateCustomer"

//       const response = await AxiosInstance.post(
//         `/publiccontrol/${endpointType}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       )
//       const res = response.data
//       // console.log("Response", JSON.stringify(res))
//       if (response.status === 200) {
//         dispatch(fetchUserProfile())

//         console.log("Data updated successfully!")
//         setEditing(false) // Exit editing mode on successful save
//         // Handle success scenario
//       } else {
//         console.error("Failed to update data:", response.statusText)
//         // Handle failure scenario
//       }
//     } catch (error) {
//       console.error("Failed to update data:", error)
//       // Handle network error
//     }
//   }

//   return (
//     <main className="md:p-3 flex flex-col items-center w-full gap-4">
//       <header>
//         <h1 className="text-3xl font-medium">My Profile</h1>
//       </header>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="w-full md:w-auto md:bg-white shadow-md p-5 md:p-10 flex flex-col md:flex-row items-center justify-center gap-5 rounded-lg">
//             <div className="flex flex-col gap-2 items-center">
//               <div className="relative w-40 h-40 rounded-full border-2  overflow-hidden">
//                 {editing ? (
//                   <>
//                     {data?.photo instanceof File ? (
//                       <img
//                         src={URL.createObjectURL(data.photo)}
//                         alt="User photo"
//                         className="absolute inset-0 object-contain size-full "
//                       />
//                     ) : (
//                       <img
//                         src={userProfile?.photo || user.src}
//                         className="absolute inset-0 object-contain size-full"
//                       />
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0]
//                         // if (file) {
//                         //   const reader = new FileReader();
//                         //   reader.onloadend = () => {
//                         //     setData({ ...data, photo: reader.result as string });
//                         //   };
//                         //   reader.readAsDataURL(file);
//                         // }
//                         setData({ ...data, photo: file })
//                       }}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                   </>
//                 ) : (
//                   <img
//                     // src={typeof data?.photo === "string" ? data.photo : data?.photo ? URL.createObjectURL(data.photo) : user}
//                     src={userProfile?.photo || user.src}
//                     alt="User photo"
//                     className="absolute inset-0 object-contain size-full"
//                   />
//                 )}
//                 {!editing && (
//                   <div className="absolute bottom-2 right-2 bg-gray-800 p-1 rounded-full">
//                     <button
//                       onClick={() => setEditing(true)}
//                       className="text-white text-xs font-semibold"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col gap-4">
//               <div className="grid w-full md:grid-cols-2 gap-8">
//                 <div>
//                   <Label htmlFor="first-name">First Name</Label>
//                   <Input
//                     id="first-name"
//                     placeholder="Enter your full name"
//                     type="text"
//                     value={data?.first_name || ""}
//                     onChange={(e) =>
//                       setData({ ...data, first_name: e.target.value })
//                     }
//                     disabled={!editing} // Disable input when not editing
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="last-name">Last Name</Label>
//                   <Input
//                     id="last-name"
//                     placeholder="Enter your full name"
//                     type="text"
//                     value={data?.last_name || ""}
//                     onChange={(e) =>
//                       setData({ ...data, last_name: e.target.value })
//                     }
//                     disabled={!editing} // Disable input when not editing
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     placeholder="Enter your email address"
//                     type="text"
//                     value={data?.email || ""}
//                     onChange={(e) =>
//                       setData({ ...data, email: e.target.value })
//                     }
//                     disabled={!editing} // Disable input when not editing
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="mobile">Mobile</Label>
//                   <Input
//                     id="mobile"
//                     placeholder="Enter your mobile"
//                     type="text"
//                     value={data?.mobile_number || ""}
//                     onChange={(e) =>
//                       setData({ ...data, mobile_number: e.target.value })
//                     }
//                     disabled={!editing} // Disable input when not editing
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col md:flex-row gap-8 px-10 pt-4">
//                 {!editing ? (
//                   <button
//                     type="button"
//                     onClick={() => setEditing(true)}
//                     className="w-40 pt-4 bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg"
//                   >
//                     Edit
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="w-40 pt-4 bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg"
//                   >
//                     Save
//                   </button>
//                 )}
//                 <Link href="/changepassword">
//                   <button className="bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg">
//                     Update Password
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </main>
//   )
// }
