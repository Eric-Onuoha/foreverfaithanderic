import { useSelector } from "react-redux";
import RegistryItemsPreview from "./registryItemsPreview/registryItemsPreview.component"

const RegistryItems = () => {
    const registryItems = useSelector((state) => state.registryitems.registryitems) || {};
    console.log(registryItems);
    return(
        <RegistryItemsPreview registryItems = {registryItems}/>
    )
};
export default RegistryItems;