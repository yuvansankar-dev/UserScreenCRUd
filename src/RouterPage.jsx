import "./App.css";
import * as yup from "yup";
import CreateData from "./CreateData/CreateData";
import EditData from "./EditData/EditData";
import ListScreen from "./ListScreen/ListScreen";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const RouterPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Nick name required"),
    username: yup.string().required("User name required"),
    email: yup.string().email("Invalid Email ID").required("Email required"),
    address: yup.object().shape({
      street: yup.string().required("Street required"),
      suite: yup.string().required("Suite required"),
      city: yup.string().required("City required"),
      zipcode: yup.string().required("Zipcode required"),
      geo: yup.object().shape({
        lat: yup.string().required("Latitude required"),
        lng: yup.string().required("Longitude required"),
      }),
    }),
    phone: yup.string().required("Phone Number required"),
    website: yup.string().required("Website required"),
    company: yup.object().shape({
      name: yup.string().required("Company Name required"),
      catchPhrase: yup.string().required("Catch Phrase required"),
      bs: yup.string().required("BS required"),
    }),
  });

  const onSubmit = (id) => (values) => {
    //This function executes when the the submit button clicks in create and update screen
    let promise;
    let errorMSG;
    if (id !== -1) {
      promise = axios.put(
        `https://65d582f23f1ab8c634372323.mockapi.io/api/userData/${id}`,
        values
      );
      errorMSG = "Data Updation failed";
    } else {
      promise = axios.post(
        `https://65d582f23f1ab8c634372323.mockapi.io/api/userData`,
        values
      );
      errorMSG = "Data Creation failed";
    }
    promise
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch(() => {
        window.alert(errorMSG);
        navigate("/");
      });
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<ListScreen />} />
        <Route path='*' element={<ListScreen />} />
        <Route
          path='/create'
          element={
            <CreateData
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            />
          }
        />
        <Route
          path='/edit/:id'
          element={
            <EditData validationSchema={validationSchema} onSubmit={onSubmit} />
          }
        />
      </Routes>
    </div>
  );
};

export default RouterPage;
