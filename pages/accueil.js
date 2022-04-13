import { getCookies } from "cookies-next";
import Menu from "../components/menu"

function Accueil() {
    return (
        <>
        <Menu data={getCookies().userRole} />
        <h1>Accueil</h1>
        </>
    )
}

export default Accueil;