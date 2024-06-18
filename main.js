
document.addEventListener('DOMContentLoaded', function() {
    fetchClassement();
});

function fetchClassement() {
    const apiUrl = 'https://apiv3.apifootball.com/?action=get_standings&league_id=239&APIkey=bd4d86a915f6de4e738983be5f42fd57351d1288c4db82a733639a381e0dff52';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('#classementTable tbody');
        tbody.innerHTML = ''; // Clear existing rows

        data.forEach(team => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${team.overall_league_position}</td>
                <td><img src="${team.team_badge}" alt="${team.team_name} Badge" class="team-badge"></td>
                <td style="font-weight:bold;">${team.team_name}</td>
                <td>${team.overall_league_payed}</td>
                <td>${team.overall_league_W}</td>
                <td>${team.overall_league_D}</td>
                <td>${team.overall_league_L}</td>
                <td>${team.overall_league_GF}-${team.overall_league_GA}</td>
                <td style='color:yellow;'>${team.overall_league_PTS}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

const rows = document.querySelectorAll('');