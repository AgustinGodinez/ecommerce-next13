'use client'
import React from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Auth } from '@/api';
import { useRouter } from 'next/navigation'

const authCtrl = new Auth()

const SignupSchema = Yup.object().shape({
  email: Yup.string().email(true).required(true),
  username: Yup.string().required(true),
  name: Yup.string().required(true),
  password: Yup.string().required(true)
});

export default function RegisterForm() {
  const router= useRouter();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      name: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.register(formValue)
        router.push("/join/sign-in")
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  });


  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          label='Email'
          name="email"
          type="text"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          error={formik.errors.email}
          value={formik.values.email} />
        <Form.Input
          label='Nombre'
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
          error={formik.errors.username}
          value={formik.values.username} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label='Nombre y Apellidos'
          name="name"
          type="text"
          placeholder="Nombre y apellidos"
          error={formik.errors.name}
          onChange={formik.handleChange}
          value={formik.values.name} />
        <Form.Input
          label='password'
          name="password"
          type="Password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          error={formik.errors.password}
          value={formik.values.password} />
      </Form.Group>
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
}