async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=36bef380-7d24-4d95-9a6f-57a17b4c1358");
        const data = await response.json();

        if (data.status !== "success") return;

        const matchesList = data.data;
        const relevantData = matchesList.filter(match => match.series == "Indian Premier League 2024").map(match => ({
            name: `${match.t1} vs ${match.t2}, ${match.status}`,
            link: `https://www.iplt20.com/matches/fixtures`
        }));

        console.log({ relevantData });
        document.getElementById("matches").innerHTML = relevantData.map(match =>
            `<li><a href="${match.link}" target="_blank">${match.name}</a></li>`
        ).join('');

        return relevantData;
    } catch (error) {
        console.log(error);
    }
}

getMatchData();
