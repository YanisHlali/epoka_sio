export default function Missions({ infos }) {
    return (
        <ul>
            <li>{infos.nom_salarie}</li>
            <li>{infos.prenom_salarie}</li>
            <li>{infos.debut_mission}</li>
            <li>{infos.fin_mission}</li>
            <li>{infos.nom_commune_2}</li>
        </ul>
    )
}