import * as Yup from 'yup'

export function initialValues() {
    return {
        email: '',
        repeatEmail: ''
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        repeatEmail: Yup.string().required(true).oneOf([Yup.ref('email')], "Revise su correo")
    })
}
