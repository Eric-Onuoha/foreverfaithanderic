import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRegistryUserEmail } from "../../../redux/reducers/registryusers";
import "./registryPreview.styles.scss";

const RegistryPreview = ({ activatedEmails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accessForm, setAccessForm] = useState({ accessCode: "" });
  const { accessCode } = accessForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccessForm({ ...accessForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (activatedEmails.includes(accessCode)) {
      try {
        // ✅ Store email in Redux before navigating
        dispatch(updateRegistryUserEmail(accessCode));

        navigate("/giftregistrypreview");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Invalid access code. Please contact the couple for assistance.");
    }
  };

  return (
    <div id="RegistryPreviewComponent">
      <div id="access">
        <form onSubmit={handleSubmit}>
          <label htmlFor="accessCode" id="accessCodeLabel">
            The Gift Registry is limited to family and close friends. Please
            reach out to the couple for an access code.
          </label>
          <br />
          <input
            id="accessCode"
            type="text"
            name="accessCode"
            onChange={handleChange}
            placeholder="Enter Access Code (Email)"
            value={accessCode}
          />
          <button type="submit">View Gift Registry</button>
        </form>
      </div>
    </div>
  );
};

export default RegistryPreview;
