import { Formik, Field, Form, useField } from "formik";
import * as Yup from "yup";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col mb-4'>
      <label className='capitalize' htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input border-2 border-blue-800 p-2 rounded-md" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const getRegions = country => {
  // Simulate async call
  return new Promise((resolve, reject) => {
    switch (country) {
      case "United States":
        resolve([
          { value: "Washington", label: "Washington" },
          { value: "California", label: "California" }
        ]);
        break;
      case "Canada":
        resolve([
          { value: "Alberta", label: "Alberta" },
          { value: "NovaScotia", label: "Nova Scotia" }
        ]);
        break;
      default:
        resolve([]);
    }
  });
};

const SelectForm = () => {
  return (
    <div className="app">
      <Formik
        initialValues={{ country: '', region: '', city: '', regions: [] }}
        validationSchema={Yup.object().shape({
          country: Yup.string()
            .required("Required"),
          region: Yup.string()
            .required("Required"),
          city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values)
          resetForm()
        }}
      >
        {props => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <MySelect
                label="country"
                name="country"
                onChange={async e => {
                  const { value } = e.target;
                  const _regions = await getRegions(value);
                  setFieldValue("country", value);
                  setFieldValue("region", '');
                  setFieldValue("regions", _regions);
                }}
              >
                <option value="">Select a land</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
              </MySelect>
              
              <MySelect
                label="region"
                name="region"
                onChange={handleChange}
              >
                <option value="">Select region</option>
                {values.regions &&
                  values.regions.map(r => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
              </MySelect>

              <MyTextInput
                label="City"
                name="city"
                type="text"
                placeholder="City"
              />

              <button type="submit" className='bg-blue-800 text-white px-4 py-2 rounded-lg'>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SelectForm