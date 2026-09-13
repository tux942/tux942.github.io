// lanyard intergration | made by @jkbinf
const userId = '1508036329298984973';
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

const statusColors = {
    online: '#43b581',
    idle: '#faa61a',
    dnd: '#f04747',
    offline: '#747f8d'
};

async function fetchDiscordStatus() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.success) {
            const status = data.data.discord_status;
            updateStatusDisplay(status);
        } else {
            console.error('Failed to fetch Discord status:', data.error);
            updateStatusDisplay('offline');
        }
    } catch (error) {
        console.error('Error fetching Discord status:', error);
        updateStatusDisplay('offline');
    }
}

function updateStatusDisplay(status) {
    const statusDot = document.querySelector('.status-dot');
    const discordText = document.querySelector('.discord-text');

    if (statusDot && discordText) {
        const color = statusColors[status] || statusColors.offline;

        statusDot.style.backgroundColor = color;
        statusDot.style.boxShadow = `0 0 8px ${color}`;
        discordText.style.color = color;
    }
}

// Initial fetch
fetchDiscordStatus();

// Update every 30 seconds
setInterval(fetchDiscordStatus, 30000);
