import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdd } from '../../Redux-actions';
import { getUsersById } from '../../Redux-actions'
import firebaseApp from '../../Credential/index'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)


export default function Ads({ user }) {
    const dispatch = useDispatch();

   
    useEffect(() => {
        dispatch(getUsersById(user.email))
    }, [dispatch])

 const User = useSelector(state => state.userDetail)

    function handleChange(e) {
        e.preventDefault();
        setPost({
            ...post,
            [e.target.name]: e.target.value,
            professionalMedicalLicense: User.professional?.medicalLicense

        })

    }



    const [post, setPost] = useState({
        specialty: "",
        price: "",
        timeAvailability: "",
        serviceType: "",
    })

    function handleSubmit(e) {
        e.preventDefault();

           
        dispatch(postAdd(post))
        alert("Add Created")
        setPost({
            specialty: "",
            price: "",
            timeAvailability: "",
            serviceType: "",
            professionalMedicalLicense:""
        })
    }

    return (
        <div>
            <div>

                <form onSubmit={handleSubmit}>
                    <label>
                        Especialidad:
                        <input type="text" id="specialty" name="specialty"
                            value={post.specialty}
                            onChange={(e) => handleChange(e)} />
                    </label>

                    <label>
                        Precio:
                        <input type="text" id="price" name="price"
                            value={post.price} onChange={(e) =>
                                handleChange(e)} />
                    </label>

                    <label>
                        Tiempo disponible:
                        <input type="text" id="timeAvailability"
                            name="timeAvailability" value={post.timeAvailability}
                            onChange={(e) => handleChange(e)} />
                    </label>

                    <label>
                        Tipo de servicio:
                        <input type="text" id="serviceType" name="serviceType"
                            value={post.serviceType}
                            onChange={(e) => handleChange(e)} />
                    </label>

                    <input type="submit" onClick={(e) => handleSubmit(e)} />

                </form>
            </div>


        </div>
    )
}