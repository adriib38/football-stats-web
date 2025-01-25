import NextGames from "../Games/NextGames";

export default function Inicio() {

    return (
        <div style={{
            margin: "0 auto"
        }}>
            <h1>Proximos partidos</h1>
            <NextGames />
            <p>Estadísticas competiciones europeas próximamente.</p>
        </div>
    )
}