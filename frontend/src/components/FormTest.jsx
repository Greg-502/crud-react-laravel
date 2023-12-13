import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const FormTest = () => {
  return (
    <div>
      <h1>Displaying Error Messages</h1>
      <Formik
        initialValues={{
          username: 'israel',
          email: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values)
          resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form className=''>
            <div className='flex flex-col my-4'>
              <Field name="username" className='rounded border-2 border-blue-700 py-2 px-2'/>
              {touched.username && errors.username && <div>{errors.username}</div>}
            </div>

            <div className='flex flex-col my-4'>
              <Field name="email" className='rounded border-2 border-blue-700 py-2 px-2'/>
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>

            <button type="submit" className='rounded bg-blue-700 text-white py-2 px-4'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormTest