import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../../../services/firebase.services'


function ProductDetailPage() {
    const { id } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (id) {
            (async () => {
                const detailResponse = await getProductById(id)
                // console.log(detailResponse);
                setData(detailResponse)
            })()
        }
    }, [id])

    return (

        <div className="px-2 py-20 w-full flex justify-center">
            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
                <div className="lg:w-1/2">
                    <div className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
                    >
                        {data?.imgURL ? <img className="rounded-t-lg" src={data?.imgURL} alt="" /> : null}
                    </div>
                </div>
                <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
                    <h2 className="text-3xl text-gray-800 font-bold">
                        {data?.name}
                        <span className="text-indigo-600">{data?.price}rs</span>
                        {/* <span className="text-indigo-600">{data?.qty}</span> */}
                    </h2>
                    <h2 className="text-3xl text-gray-800 font-bold">

                        <span className="text-indigo-600">{data?.qty} pieces available</span>
                        {/* <span className="text-indigo-600">{data?.qty}</span> */}
                    </h2>
                    <p className="mt-4 text-gray-600">
                        {data?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage