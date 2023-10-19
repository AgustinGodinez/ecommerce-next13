import { useFormik } from 'formik'
import styles from './ChangepasswordForm.module.scss'
import { Form } from 'semantic-ui-react'
import { initialValues, validationSchema } from './ChangepasswordForm.form'
import { useAuth } from '@/hooks'
import { User } from '@/api'
import { useState } from 'react'
import { Confirme } from '@/components/Shared'

const userCtrl = new User()

export function ChangepasswordForm() {
    const { user, logout } = useAuth()
    const [showConfirm, setShowConfirm] = useState(false)
    const [useId, setUseId] = useState("")
    const [passget, setPassget] = useState("")
    const openCloseConfirm = () => setShowConfirm(prevSate => !prevSate)

    const update = async () => {
        await userCtrl.updateMe(useId, { password: passget })
        logout()
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                openCloseConfirm()
                try {
                    setUseId(user.id)
                    setPassget(formValue.password)
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }

            /*             try {
                            const result = await userCtrl.updateMe(user.id, {password: formValue.password})
                            logout()
                        } catch (error) {
                            console.log(error);
                        } */
        }
    })
    return (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <label>Cambiar contraseña</label>
            <Form.Input
                type='password'
                name='password'
                placeholder="Nueva Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Input
                type='password'
                name='repeatpassword'
                placeholder="Repetir Contraseña"
                value={formik.values.repeatpassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatpassword}
            />
            <Form.Button type='submit' loading={formik.isSubmitting} >Enviar</Form.Button>
            <Confirme
                open={showConfirm}
                onConfirm={update}
                onCancel={openCloseConfirm}
                content="Estas seguro de que quieres cambiar la Contraseña?"
            />
        </Form>
    )
}
