// import React, { useRef } from 'react'
// import { useForm } from 'react-hook-form'
// import { addProduct } from '../../services/firebase.services'
// import { storage, storageRef } from '../../config/firebaseConfig/config'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useNavigate } from "react-router-dom";


// function AddProductForm() {
//     const imgRef = useRef(null);
//     const navigate = useNavigate();
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm()

//     const func = async (data) => {
//         await addProduct(data)
//     }
//     const onSubmit = async (data) => {
//         const addProductResponse = await addProduct(data)
//         reset()
//         alert('Product added successfully')
//     }

//     // debugger
//     // const handleImageUpload = async (e) => {
//     //     const file = imgRef.current.files[0];
//     //     console.log(file)
//     //     const imagesRef = ref(storage, 'images');
//     //     const spaceRef = ref(storage, `images/${file.name}`);
//     //     const uploadTask = uploadBytesResumable(storageRef, file);
//     //     // const fileRef = storageRef.child(`images/${file.name}`);

//     //     uploadTask.on('state_changed',
//     //         (snapshot) => {
//     //             // Observe state change events such as progress, pause, and resume
//     //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     //             console.log('Upload is ' + progress + '% done');
//     //             switch (snapshot.state) {
//     //                 case 'paused':
//     //                     console.log('Upload is paused');
//     //                     break;
//     //                 case 'running':
//     //                     console.log('Upload is running');
//     //                     break;
//     //             }
//     //         },
//     //         (error) => {
//     //             // Handle unsuccessful uploads
//     //         },
//     //         () => {
//     //             // Handle successful uploads on complete
//     //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     //                 data = { ...data, imgURL: downloadURL }
//     //                 func(data);
//     //                 console.log('File available at', downloadURL);
//     //                 reset()
//     //                 alert('Product added successfully')
//     //             });
//     //         }
//     //     );

//     // };



//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type='text' placeholder='name' {...register("name", { required: true })} />
//             {errors.name && <span>required</span>}
//             <br />
//             <input type='number' placeholder='price' {...register("price", { required: true })} />
//             {errors.price && <span>required</span>}
//             <br />
//             <input type='number' placeholder='quantity' {...register("qty", { required: true })} />
//             {errors.qty && <span>required</span>}
//             <br />
//             <textarea placeholder='description' cols="30" rows="10" {...register("description", { required: true })}></textarea>
//             {errors.description && <span>required</span>}
//             <br />

//             <input type="file" ref={imgRef} />
//             <button type='submit'>ADD</button>
//         </form>
//     )
// }

// export default AddProductForm


import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addProduct } from '../../services/firebase.services';
import { storage } from '../../config/firebaseConfig/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function AddProductForm() {
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const file = imgRef.current.files[0];
        const imagesRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(imagesRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Handle progress or state changes if needed
            },
            (error) => {
                console.error('Error uploading image:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const productData = { ...data, imgURL: downloadURL };
                    addProduct(productData).then(() => {
                        reset();
                        alert('Product added successfully');
                        navigate('/'); // Redirect to homepage or wherever needed
                    }).catch((error) => {
                        console.error('Error adding product:', error);
                        alert('Error adding product');
                    });
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                    alert('Error getting download URL');
                });
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' placeholder='name' {...register('name', { required: true })} />
            {errors.name && <span>required</span>}
            <br />
            <input type='number' placeholder='price' {...register('price', { required: true })} />
            {errors.price && <span>required</span>}
            <br />
            <input type='number' placeholder='quantity' {...register('qty', { required: true })} />
            {errors.qty && <span>required</span>}
            <br />
            <textarea placeholder='description' cols="30" rows="10" {...register('description', { required: true })}></textarea>
            {errors.description && <span>required</span>}
            <br />

            <input type="file" ref={imgRef} />
            <button type='submit'>ADD</button>
        </form>
    );
}

export default AddProductForm;
