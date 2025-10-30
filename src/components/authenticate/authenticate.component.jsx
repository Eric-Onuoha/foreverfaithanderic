import React from "react";
import RegistryPage from "../../pages/registryPage/registryPage.component";

const Authenticate = ({component: Component, user}) => {
    console.log(user)
    return(
        <div>
        { user ? (
            <Component/>
        ) : (
            <RegistryPage/>
        )}
        </div>
    )
}; export default Authenticate;