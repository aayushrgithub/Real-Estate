import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CreateListing = () => {

    const currentUser = useSelector(store => store.user)
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });

    const handleImageSubmit = () => {
        console.log(files);
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                })
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((x, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:7000/api/listing/create", {
            ...formData, userRef: currentUser._id,
        }, { withCredentials: true })
        toast.success("Created Listing Successfully");
        navigate(`/listing/${data._id}`)
    }

    return (
        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
            <form onSubmit={handleSubmit} className='flex gap-12'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input onChange={handleChange} value={formData.name} type='text' id='name' placeholder='Name' className='border p-3 rounded-lg' />
                    <input onChange={handleChange} value={formData.description} type='text' id='description' placeholder='Description' className='border p-3 rounded-lg' />
                    <input onChange={handleChange} value={formData.address} type='text' id='address' placeholder='Address' className='border p-3 rounded-lg' />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input checked={formData.type === 'sale'} onChange={handleChange} type='checkbox' id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input checked={formData.type === 'rent'} onChange={handleChange} type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input checked={formData.parking} onChange={handleChange} type='checkbox' id='parking' className='w-5' />
                            <span>Parking Spot</span>
                        </div>

                        <div className='flex gap-2'>
                            <input checked={formData.furnished} onChange={handleChange} type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>

                        <div className='flex gap-2'>
                            <input checked={formData.offer} onChange={handleChange} type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input value={formData.bedrooms} onChange={handleChange} id='bedrooms' className='p-3 border border-gray-300 rounded-lg' type='number' required />
                            <p>Beds</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input value={formData.bathrooms} onChange={handleChange} id='bathrooms' className='p-3 border border-gray-300 rounded-lg' type='number' required />
                            <p>Baths</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input value={formData.regularPrice} onChange={handleChange} id='regularPrice' className='p-3 border border-gray-300 rounded-lg' type='number' required />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($/month)</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input value={formData.discountPrice} onChange={handleChange} id='discountPrice' className='p-3 border border-gray-300 rounded-lg' type='number' required />
                            <div className='flex flex-col items-center'>
                                <p>Discount Price</p>
                                <span className='text-xs'>($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover</span>
                    </p>

                    <div className='flex gap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type='file' accept='image/*' multiple onChange={(e) => setFiles(e.target.files)} />
                        <button onClick={handleImageSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg'>Upload</button>
                    </div>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button type='submit' className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing