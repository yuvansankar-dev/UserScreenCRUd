import { useFormik } from "formik";
import { useEffect } from "react";
import "./EditData.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditData = ({ validationSchema, onSubmit }) => {
  const navigate = useNavigate();
  const params = useParams();
  let initialValues;

  useEffect(() => {
    //Get call is used To load already saved data into form
    axios
      .get(
        `https://65d582f23f1ab8c634372323.mockapi.io/api/userData/${params.id}`
      )
      .then((res) => {
        console.log(res.data);
        if (!res.data) {
          //If wrong id is provided then navigate to list screen
          navigate("/");
        } else {
          //If Data fetched successfully then load form with fetched data
          Formik.setValues(res.data);
        }
      })
      .catch((errors) => {
        //If API gets failed then navigate to list screen
        console.log(errors);
        navigate("/");
      });
  }, []);

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit(params.id),
  });

  //Return Loading text when the Get API call is in pending state
  if (!Formik.values) {
    return <>Loading...</>;
  }

  //Return FORM when the Get API call gats fullfilled state
  return (
    <form onSubmit={Formik.handleSubmit}>
      <h2>Edit User</h2>
      <br />
      <div>
        <label>Nick Name</label>
        <div>
          <input
            name='name'
            value={Formik.values.name}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='name'> {Formik.errors?.name}</span>
        </div>
      </div>
      <br />
      <div>
        <label>User Name</label>
        <div>
          <input
            name='username'
            value={Formik.values.username}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='username'> {Formik.errors?.username}</span>
        </div>
      </div>
      <br />
      <div>
        <label>Email Address</label>
        <div>
          <input
            name='email'
            value={Formik.values.email}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='email'> {Formik.errors?.email}</span>
        </div>
      </div>
      <br />
      <div>
        <label>Address</label>
        <div>
          <label>street</label>
          <input
            name='address.street'
            value={Formik.values.address?.street}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.street'>{Formik.errors?.address?.street}</span>
          <label>suite</label>
          <input
            name='address.suite'
            value={Formik.values.address?.suite}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.suite'>{Formik.errors?.address?.suite}</span>
          <label>city</label>
          <input
            name='address.city'
            value={Formik.values.address?.city}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.city'>{Formik.errors?.address?.city}</span>
          <label>zipcode</label>
          <input
            name='address.zipcode'
            value={Formik.values.address?.zipcode}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.zipcode'>{Formik.errors?.address?.zipcode}</span>
          <label>lat</label>
          <input
            name='address.geo.lat'
            value={Formik.values.address?.geo?.lat}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.geo.lat'>{Formik.errors?.address?.geo?.lat}</span>
          <label>lng</label>
          <input
            name='address.geo.lng'
            value={Formik.values.address?.geo?.lng}
            type='text'
            onChange={Formik.handleChange}
          />
          <span name='address.geo.lng'>{Formik.errors?.address?.geo?.lng}</span>
        </div>
      </div>
      <br />
      <div>
        <label>Phone Number</label>
        <div>
          <input
            name='phone'
            value={Formik.values.phone}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='phone'> {Formik.errors?.phone}</span>
        </div>
      </div>
      <br />
      <div>
        <label>Website</label>
        <div>
          <input
            name='website'
            value={Formik.values.website}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='website'> {Formik.errors?.website}</span>
        </div>
      </div>
      <br />
      <div>
        <label>Company</label>
        <div>
          <label>Company Name</label>
          <input
            name='company.name'
            value={Formik.values.company?.name}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='company.name'> {Formik.errors?.company?.name}</span>

          <label>Company CatchPhrase</label>
          <input
            name='company.catchPhrase'
            value={Formik.values.company?.catchPhrase}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='company.catchPhrase'>
            {Formik.errors?.company?.catchPhrase}
          </span>

          <label>Company bs</label>
          <input
            name='company.bs'
            value={Formik.values.company?.bs}
            onChange={Formik.handleChange}
            type='text'
          />
          <span name='company.bs'> {Formik.errors?.company?.bs}</span>
        </div>
      </div>
      <br />
      <button type='submit'>Update</button>
    </form>
  );
};

export default EditData;
