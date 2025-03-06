
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const razorpay_order_id = searchParams.get("razorpay_order_id")
    const payment_id = searchParams.get("razorpay_payment_id")
    const signature = searchParams.get("razorpay_signature")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    // Function to verify Razorpay payment
    const verifyRazorpay = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/verifyRazorpay`,
                { razorpay_order_id, payment_id, signature, appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

            navigate("/my-appointments")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (token && razorpay_order_id && payment_id && signature) {
            verifyRazorpay()
        }
    }, [token])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Verify


// import axios from 'axios';
// import React, { useContext, useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { toast } from 'react-toastify';

// const Verify = () => {

//     const [searchParams, setSearchParams] = useSearchParams()

//     const success = searchParams.get("success")
//     const appointmentId = searchParams.get("appointmentId")

//     const { backendUrl, token } = useContext(AppContext)

//     const navigate = useNavigate()

//     // Function to verify stripe payment
//     const verifyStripe = async () => {

//         try {

//             const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

//             if (data.success) {
//                 toast.success(data.message)
//             } else {
//                 toast.error(data.message)
//             }

//             navigate("/my-appointments")

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     useEffect(() => {
//         if (token, appointmentId, success) {
//             verifyStripe()
//         }
//     }, [token])

//     return (
//         <div className='min-h-[60vh] flex items-center justify-center'>
//             <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
//         </div>
//     )
// }

// export default Verify