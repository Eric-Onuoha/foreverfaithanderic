import NavigationPreview from "./navigationPreview/navigationPreview.component"

const Navigation =()=>{
    const navItems = [
        { id: 1, linkValue: "", navItem:"Home" },
        // { id: 2, linkValue: "dates", navItem:"Our Dates"  },
        // { id: 3, linkValue: "timeline", navItem:"Our Timeline"},
        { id: 4, linkValue: "gallery", navItem:"Gallery" },
        { id: 5, linkValue: "registry", navItem:"Gift Registry" }
    ]
    return(
        <NavigationPreview navItems={navItems}/>
    )
};
export default Navigation;