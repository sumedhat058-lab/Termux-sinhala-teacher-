let appData = { categories: [], commands: [] };

document.addEventListener('DOMContentLoaded', () => {
    fetch('commands.json')
        .then(res => res.json())
        .then(data => {
            appData = data;
            renderFolders(appData.categories);
        })
        .catch(err => console.log('Error loading commands.json:', err));
});

function renderFolders(categories) {
    const container = document.getElementById('folderContainer');
    container.innerHTML = '';

    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'folder-card';
        card.onclick = () => openFolder(cat.id, cat.title);
        card.innerHTML = `
            <i class="${cat.icon || 'fa-solid fa-folder'}"></i>
            <h3>${cat.title}</h3>
        `;
        container.appendChild(card);
    });
}

function openFolder(catId, title) {
    document.getElementById('modalTitle').innerHTML = `<i class="fa-solid fa-folder-open"></i> ${title}`;
    const list = document.getElementById('commandList');
    list.innerHTML = '';

    const filteredCmds = appData.commands.filter(cmd => cmd.category === catId);

    if (filteredCmds.length === 0) {
        list.innerHTML = '<p style="color: #8b949e;">තවම මේ Folder එකට Commands එකතු කර නැත.</p>';
    } else {
        filteredCmds.forEach(cmd => {
            const item = document.createElement('div');
            item.className = 'cmd-item';
            item.innerHTML = `
                <div class="cmd-code">
                    <code>${cmd.code}</code>
                    <button class="copy-btn" onclick="copyCmd('${cmd.code}', this)">Copy</button>
                </div>
                <p>${cmd.description}</p>
            `;
            list.appendChild(item);
        });
    }

    document.getElementById('commandModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('commandModal').style.display = 'none';
}

function copyCmd(code, btn) {
    navigator.clipboard.writeText(code);
    btn.innerText = 'Copied!';
    setTimeout(() => btn.innerText = 'Copy', 2000);
}

// Global Search
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    if (!term) return;

    const list = document.getElementById('commandList');
    list.innerHTML = '';
    document.getElementById('modalTitle').innerText = 'Search Results';

    const results = appData.commands.filter(cmd => 
        cmd.code.toLowerCase().includes(term) || cmd.description.toLowerCase().includes(term)
    );

    if (results.length > 0) {
        results.forEach(cmd => {
            const item = document.createElement('div');
            item.className = 'cmd-item';
            item.innerHTML = `
                <div class="cmd-code">
                    <code>${cmd.code}</code>
                    <button class="copy-btn" onclick="copyCmd('${cmd.code}', this)">Copy</button>
                </div>
                <p>${cmd.description}</p>
            `;
            list.appendChild(item);
        });
        document.getElementById('commandModal').style.display = 'block';
    }
});
