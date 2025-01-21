const API_BASE_URL = "https://seal-app-myhre.ondigitalocean.app/t";

export const getTeam = async(team) => {
    const url = `${API_BASE_URL}/${team}`;
    console.log("Servicio: "+team)
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await resp.json();
    return { data, resp }
}

export const getTeamGames = async(team) => {
    const url = `${API_BASE_URL}/${team}/games`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await resp.json();
    return { data, resp }
}