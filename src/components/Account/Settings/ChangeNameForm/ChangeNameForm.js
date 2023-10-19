import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeNameForm.form'
import { useAuth } from '@/hooks'
import { User } from '@/api'
import { useState } from 'react'
import { Confirme } from '@/components/Shared'

const userCtrl = new User()

export function ChangeNameForm() {
  const { user, updateUser } = useAuth()

  const [showConfirm, setShowConfirm] = useState(false)
  const [useId, setUseId] = useState("")
  const [data, setData] = useState({})
  const openCloseConfirm = () => setShowConfirm(prevSate => !prevSate)

  const update = async () => {
    await userCtrl.updateMe(useId, data)
    updateUser("firstname", data.firstname)
    openCloseConfirm()
    console.log(data);
  }

  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        openCloseConfirm()
        try {
          setUseId(user.id)
          setData(formValue)
        } catch (error) {
          console.log(error);
        }
        formik.handleReset()
      } catch (error) {
        console.log(error);
      }
      /*       try {
              const response = await userCtrl.updateMe(user.id, formValue)
              updateUser("firstname", formValue.firstname)
            } catch (error) {
              console.log(error);
            } */
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Nombre y apellidos</label>
      <Form.Group widths="equal" >
        <Form.Input
          name="firstname"
          placeholder="Nombre y Apellidos"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          placeholder="Nombre y Apellidos"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Form.Button type='submit' loading={formik.isSubmitting} width={2}>Enviar</Form.Button>
      </Form.Group>
      <Confirme
        open={showConfirm}
        onConfirm={update}
        onCancel={openCloseConfirm}
        content="Estas seguro de que quieres cambiar tu Nombre y apellidos?"
      />
    </Form>
  )
}
