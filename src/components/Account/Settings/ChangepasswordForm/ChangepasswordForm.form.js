import * as Yup from 'yup'

export function initialValues(firstname, lastname) {
    return {
        password: '',
        repeatpassword: ''
    };
}

export function validationSchema() {
    return Yup.object({
        password: Yup.string().required(true),
        repeatpassword: Yup.string().required(true).oneOf([Yup.ref('password')], "Revise su contraseña")
    })
}
