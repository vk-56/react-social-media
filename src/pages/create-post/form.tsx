import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../styles/form.css'

interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () => {
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().max(200).required("You must add a description"),

    })

    const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const onCreatePost = (data : CreateFormData) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder='Title...' {...register("title")}/>
            <p> {errors.title?.message} </p>
            <textarea placeholder='Description...' {...register("description")}/>
            <p> {errors.description?.message} </p>
            <input type='submit' />
        </form>
    );
};