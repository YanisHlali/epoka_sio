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
                </nav>
            </header>
            </>
        )
    }