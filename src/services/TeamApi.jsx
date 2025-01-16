const API_BASE_URL = "http://localhost:3005/t";

export const getTeam = async(team) => {
    const url = `${API_BASE_URL}/${team}`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await resp.json();
    console.log(url, data)
    return { data, resp }
}