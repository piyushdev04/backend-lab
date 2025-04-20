const form = document.getElementById('uploadForm');
const fileInput = form.file;
const fileList = document.getElementById('fileList');
const dropZone = document.getElementById('dropZone');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('uploadProgress');
const progressText = document.getElementById('progressText');

// Form upload handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    uploadFile(file);
  }
});

// Drag & drop handlers
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    uploadFile(file);
  }
});

// Upload with progress
function uploadFile(file) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file);

  xhr.open('POST', '/api/upload');

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      progressContainer.style.display = 'block';
      progressBar.value = percent;
      progressText.textContent = percent + '%';
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      progressBar.value = 0;
      progressText.textContent = '0%';
      progressContainer.style.display = 'none';
      loadFiles();
    } else {
      alert('Upload failed!');
    }
  };

  xhr.send(formData);
}

// Load file list
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

// Delete a file
async function deleteFile(name) {
  await fetch(`/api/delete/${name}`, { method: 'DELETE' });
  loadFiles();
}

loadFiles();