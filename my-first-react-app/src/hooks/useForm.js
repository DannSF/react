import { useState } from 'react';

export default function useForm(initialState = {}, validateFn = null) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name] && validateFn) {
      const newErrors = validateFn({ ...form, [name]: newValue });
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validateFn) {
      const newErrors = validateFn(form);
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setErrors({});
    setTouched({});
  };

  const isValid = validateFn
    ? Object.keys(validateFn(form)).length === 0
    : true;

  return {
    form,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    resetForm,
  };
}
