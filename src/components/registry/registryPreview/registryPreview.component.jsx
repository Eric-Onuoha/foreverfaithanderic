import "./registryPreview.styles.scss";

const RegistryPreview = () => {
    return(
        <div id="RegistryPreviewComponent">
            <div id="access">
                <label htmlFor="accessCode" id="accessCode">The Gift Registry is limited to Family and close friends please reach out to the couple for an access code</label>
                <br />
                <input id="accessCode" type="text" placeholder="Enter Access Code" />
                <button>View Gift Registry</button>
            </div>
        </div>
    )
};
export default RegistryPreview;