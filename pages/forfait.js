import Menu from '../components/menu'
import Head from 'next/head'

function Forfait() {
    const handleSubmit = async (event) => {
        const data = {
            distance: event.target.distance.value,
            hebergement: event.target.hebergement.value
          };
        const JSONdata = JSON.stringify(data);
    
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSONdata,
          };
        
        const res = await fetch('http://localhost:3000/api/forfait', options);
        const response = await res.json();
    }
    return (
        <>
        <Head>
            <link rel="stylesheet" href="/styles/forfait.css" />
        </Head>
        <Menu />
        <h1>Paramètrage</h1>

        <form onSubmit={handleSubmit} method="POST">
            <div class="input">
                <p>Remboursement au km</p><br />
                <input type="text" name="distance" /><br />
            </div>
            <div class="input">
                <p>Indemnité d'hébergement</p><br />
                <input type="text" name="hebergement" /><br />
            </div>
            <div class="input">
                <input type="submit" value="Envoyer" />
            </div>
        </form>
        </>
    )
}


export default Forfait;