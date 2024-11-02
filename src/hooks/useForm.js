import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (value, field) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    }

    return { formData, setFormData, handleInputChange, handleSubmit };
}

export default useForm;
