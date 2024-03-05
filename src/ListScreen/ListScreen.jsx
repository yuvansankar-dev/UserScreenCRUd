import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const createClick = () => {
    navigate("/create");
  };

  const deleteClick = (id) => {
    axios
      .delete(`https://65d582f23f1ab8c634372323.mockapi.io/api/userData/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserData((pre) => pre.filter((book) => !(book.id === id)));
      })
      .catch(() => {
        window.alert("Unable to delete data");
      });
  };

  const editClick = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    //Get call is used To load already saved data into List
    axios
      .get(`https://65d582f23f1ab8c634372323.mockapi.io/api/userData`)
      .then((res) => {
        //If Data fetched successfully then load List with fetched data
        console.log(res.data);
        setUserData(res.data);
      })
      .catch(() => {
        //If API gets failed then show alert
        window.alert("Unable to fetch data");
        setUserData(null);
      });
  }, []);

  //Return Loading text when the Get API call is in pending state
  if (userData === undefined) {
    return <h3>Loading...</h3>;
  }

  //Return "unable to load list..." text when the Get API call failed
  if (userData === null) {
    return <h3>unable to load list...</h3>;
  }

  //If Data fetched successfully then load List with fetched data
  return (
    <>
      <div className='headerProperty'>
        <h2 style={{ margin: "0px" }}>User List</h2>
        <button style={{ margin: "0px" }} onClick={createClick}>
          Create
        </button>
      </div>
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>User ID</th>
              <th scope='col'>User Nick</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Email ID</th>
              <th scope='col'>Phone Number</th>
              <th scope='col'>WebSite</th>
              <th scope='col'>Company Name</th>
              <th scope='col'>City</th>
              <th scope='col'>Zipcode</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((userDetail) => {
              return (
                <tr key={userDetail.id}>
                  <th scope='row'>{userDetail.id}</th>
                  <td>{userDetail.name}</td>
                  <td>{userDetail.username}</td>
                  <td>{userDetail.email}</td>
                  <td>{userDetail.phone}</td>
                  <td>{userDetail.website}</td>
                  <td>{userDetail.company.name}</td>
                  <td>{userDetail.address.city}</td>
                  <td>{userDetail.address.zipcode}</td>
                  <td>
                    <button onClick={() => editClick(userDetail.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteClick(userDetail.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListScreen;
