'use client'
import { Form } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Auth } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";

const authCtrl = new Auth()

const SignupSchema = Yup.object().shape({
  identifier: Yup.string().required(true),
  password: Yup.string().required(true)
});

export default function LoginForm() {
  const {login} = useAuth()
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue)
        login(response.jwt)
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        label='Usurio o correo'
        name="identifier"
        type="text"
        placeholder="Usurio o Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
        value={formik.values.identifier}
      />
      <Form.Input
        label='Password'
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
        value={formik.values.password}
      />
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>Entrar</Form.Button>
    </Form>
  )
}
