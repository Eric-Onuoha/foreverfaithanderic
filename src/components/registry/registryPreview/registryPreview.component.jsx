import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registryPreview.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../redux/reducers/registryusers";

const RegistryPreview = ({ activatedEmails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessFormField = {
    accessCode: ""
  };

  const [accessForm, setAccessForm] = useState(accessFormField);
  const { accessCode } = accessForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccessForm({ ...accessForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activatedEmails.includes(accessCode)) {
      try {
        dispatch(setCurrentUser(accessCode));
        navigate("/giftregistrypreview");
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  return (
    <div id="RegistryPreviewComponent">
      <div id="access">
        <form onSubmit={handleSubmit}>
          <label htmlFor="accessCode" id="accessCode">
            The Gift Registry is limited to family and close friends.
            Please reach out to the couple for an access code.
          </label>
          <br />
          <br />
          <input
            id="accessCode"
            type="text"
            name="accessCode"
            onChange={handleChange}
            placeholder="Enter Access Code"
          />
          <button type="submit">View Gift Registry</button>
        </form>
      </div>
    </div>
  );
};

export default RegistryPreview;
