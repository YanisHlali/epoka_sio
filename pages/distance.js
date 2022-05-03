import Menu from '../components/menu'
import Head from 'next/head'
import communes from './data/communes.json'

function Distance({ data }) {
    const handleSubmit = async (event) => {
        const data = {
            commune_1: event.target.commune_1.value,
            commune_2: event.target.commune_2.value,
            distance: event.target.distance.value,
          };
        const JSONdata = JSON.stringify(data);
    
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSONdata,
          };
        
        const res = await fetch('https://new-epoka.vercel.app/api/distances', options);
    }
    return (
        <>
        <Head>
            <link rel="stylesheet" href="/styles/forfait.css" />
        </Head>
        <Menu />

        <div className="titre">
            <h1>Distance</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div class="input">
                <p>Commune n°1</p><br />
                <input list="communes" name="commune_1" />
                <datalist id="communes">
                    {data.map((e, index) => {
                        return (
                            <option id="commune_1" value={e.nom_commune}></option>
                        )
                    })}
                </datalist>
            </div>
            <div class="input">
                <p>Commune n°2</p><br />
                <input list="communes" name="commune_2" />
                <datalist id="communes">
                {data.map((e, index) => {
                        return (
                            <option id="commune_2" value={e.nom_commune}></option>
                        )
                    })}
                </datalist>
            </div>
            <div class="input">
                <p>Distance en km</p><br />
                <input type="number" name="distance" id="distance" /><br />
            </div>

            <input class="button" type="submit" value="Envoyer" />
        </form>
        </>
    )
}

export default Distance;

export const getStaticProps = async () => {
  
    return {
      props: { data: communes }
    }
  }