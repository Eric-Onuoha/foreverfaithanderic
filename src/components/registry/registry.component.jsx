import RegistryPreview from "./registryPreview/registryPreview.component";
import { useSelector } from "react-redux";

const Registry = () => {

    const activatedUsers = useSelector((state) => state.registryusers.registryusers) || {};
    const activatedEmails = Object.values(activatedUsers).map(user => user.email);

    return(
        <RegistryPreview activatedEmails={activatedEmails}></RegistryPreview>
    )
};
export default Registry;