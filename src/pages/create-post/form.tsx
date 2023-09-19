import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../styles/form.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () => {
    // Get user state
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().max(200).required("You must add a description"),

    })

    const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })
    
    // Reference to collection in Firebase
    const postRef = collection(db, "posts");

    const onCreatePost = async (data : CreateFormData) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })

        navigate("/")
    }

    return (
        <div className='create-post'>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder='Title...' {...register("title")}/>
                <p> {errors.title?.message} </p>
                <textarea placeholder='Description...' {...register("description")}/>
                <p> {errors.description?.message} </p>
                <input type='submit' className='submit'/>
            </form>
        </div>
    );
};