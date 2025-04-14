const form = document.getElementById('uploadForm');
const fileList = document.getElementById('fileList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = form.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
    loadFiles();
});

async function loadFiles() {
    fileList.innerHTML = '';
    const res = await fetch('/api/files');
    const files = await res.json();

    files.forEach(filename => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="/uploads/${filename}" target="_blank">${filename}</a>
            <button onclick="deleteFile('${filename}')">Delete</button>
        `;
        fileList.appendChild(li);
    });
}

async function deleteFile(name) {
     await fetch(`/api/delete/${name}`, { method: 'DELETE'});
     loadFiles();
}

loadFiles();