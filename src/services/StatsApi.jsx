const API_BASE_URL = "http://localhost:3005/c";

console.log("API_BASE_URL: " +API_BASE_URL)
export const getClassification = async(competition) => {
    const url = `${API_BASE_URL}/${competition}/classification`;
    const resp = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await resp.json();
    return { data }
};

export const getStats = async(competition) => {
    const url = `${API_BASE_URL}/${competition}/stats`;
    const resp = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    const data = await resp.json();
    return { data }
};

export const getGames = async(competition) => {
    const url = `${API_BASE_URL}/${competition}/games`;
    const resp = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await resp.json();
    return { data }
}
