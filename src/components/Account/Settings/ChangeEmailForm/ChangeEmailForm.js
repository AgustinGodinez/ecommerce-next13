import { Form, FormButton } from 'semantic-ui-react'
import styles from './ChangeEmailForm.module.scss'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeEmailForm.form'
import { User } from '@/api'
import { useAuth } from '@/hooks'
import { useState } from 'react'
import { Confirme } from '@/components/Shared'

const userCtrl = new User()

export function ChangeEmailForm() {
  const { user, updateUser } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)
  const [useId, setUseId] = useState("")
  const [emailget, setEmailget] = useState("")
  const openCloseConfirm = () => setShowConfirm(prevSate => !prevSate)


  const update = async () => {
    await userCtrl.updateMe(useId, {email: emailget})
    updateUser("email", emailget)
    openCloseConfirm()
    formik.handleReset()
  }
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        openCloseConfirm()
        try {
          setEmailget(formValue.email)
          setUseId(user.id)
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }

      /* try {
        await userCtrl.updateMe(user.id, { email: formValue.email })
        updateUser("email", formValue.email)
        formik.handleReset()
      } catch (error) {
        console.log(error);
      } */
    }
  })
  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <label>Cambiar Correo Electronico</label>
      <Form.Input
        name='email'
        placeholder="Nuevo Correo Electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name='repeatEmail'
        placeholder="Repetir Correo Electronico"
        value={formik.values.repeatEmail}
        onChange={formik.handleChange}
        error={formik.errors.repeatEmail}
      />
      <FormButton type='submit' >Enviar</FormButton>
      <Confirme
        open={showConfirm}
        onConfirm={update}
        onCancel={openCloseConfirm}
        content="Estas seguro de que quieres cambiar el Email?"
      />
    </Form>
  )
}
