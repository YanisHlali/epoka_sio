import Head from "next/head";
import { getCookies ,checkCookies, setCookies } from "cookies-next";

export default function Menu() {
    return (
        <>
        <Head>
            <link rel="stylesheet" href="/styles/menu.css" />
        </Head>
        <header className="menu">
            <nav>
                <div className="gauche">
                    <p>EPOKA</p>
                </div>
                <div className="droite">
                    <ul>
                        <li><a href="#">Deconnexion</a></li>
                        <li><a href="/missions/valider">Valider</a></li>
                        <li><a href="/missions/payer">Payer</a></li>
                        <li><a href="/forfait">Paramètrage</a></li>
                        <li><a href="/distance">Distances</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        </>
    )
}