setTimeout(() => {
  if (db) {
    // videos retreival
    let videoDbTransaction = db.transaction('video', 'readonly');
    let videoStore = videoDbTransaction.objectStore('video');

    let videoRequest = videoStore.getAll(); // event driven

    videoRequest.onsuccess = (e) => {
      let videoResult = videoRequest.result;
      let galleryCont = document.querySelector('.gallery-cont');
      videoResult.forEach((videoObj) => {
        let mediaElement = document.createElement('div');
        mediaElement.setAttribute('class', 'media-cont');
        mediaElement.setAttribute('id', videoObj.id);

        let url = URL.createObjectURL(videoObj.blobData);

        mediaElement.innerHTML = `<div class="media">
        <video autoplay loop src="${url}"></video>
        </div>
        <div class="action-btn">
            <div class="delete">DELETE</div>
            <div class="download">DOWNLOAD</div>
        </div>`;

        galleryCont.appendChild(mediaElement);

        // Listeners
        let deleteBtn = mediaElement.querySelector('.delete');
        let downloadBtn = mediaElement.querySelector('.download');
        deleteBtn.addEventListener('click', deleteListener);
        downloadBtn.addEventListener('click', downloadListener);
      });
    };

    // images retreival
    let imageDbTransaction = db.transaction('image', 'readonly');
    let imageStore = imageDbTransaction.objectStore('image');

    let imageRequest = imageStore.getAll(); // event driven

    imageRequest.onsuccess = (e) => {
      let imageResult = imageRequest.result;
      let galleryCont = document.querySelector('.gallery-cont');
      imageResult.forEach((imageObj) => {
        let mediaElement = document.createElement('div');
        mediaElement.setAttribute('class', 'media-cont');
        mediaElement.setAttribute('id', imageObj.id);

        mediaElement.innerHTML = `<div class="media">
            <img src="${imageObj.url}"></video>
            </div>
            <div class="action-btn">
                <div class="delete">DELETE</div>
                <div class="download">DOWNLOAD</div>
            </div>`;

        galleryCont.appendChild(mediaElement);

        // Listeners
        let deleteBtn = mediaElement.querySelector('.delete');
        let downloadBtn = mediaElement.querySelector('.download');
        deleteBtn.addEventListener('click', deleteListener);
        downloadBtn.addEventListener('click', downloadListener);
      });
    };
  }
}, 100);

// UI remove, DB remove
function deleteListener(e) {
  let id = e.target.parentElement.parentElement.getAttribute('id');
  let type = id.slice(0, 3);
  if (type === 'vid') {
    let videoDbTransaction = db.transaction('video', 'readwrite');
    let videoStore = videoDbTransaction.objectStore('video');
    videoStore.delete(id);
  } else if (type === 'img') {
    let imageDbTransaction = db.transaction('image', 'readwrite');
    let imageStore = imageDbTransaction.objectStore('image');
    imageStore.delete(id);
  }

  // UI removal
  e.target.parentElement.parentElement.remove();
}

function downloadListener(e) {
  let id = e.target.parentElement.parentElement.getAttribute('id');
  let type = id.slice(0, 3);

  if (type === 'vid') {
    let videoDbTransaction = db.transaction('video', 'readwrite');
    let videoStore = videoDbTransaction.objectStore('video');
    let videoRequest = videoStore.get(id);

    videoRequest.onsuccess = (e) => {
      let videoResult = videoRequest.result;
      // console.log(videoResult)
      let videoURL = URL.createObjectURL(videoResult.blobData);

      let a = document.createElement('a');
      a.href = videoURL;
      a.download = 'video.mp4';
      a.click();
    };
  } else if (type === 'img') {
    let imageDbTransaction = db.transaction('image', 'readwrite');
    let imageStore = imageDbTransaction.objectStore('image');
    let imageRequest = imageStore.get(id);

    imageRequest.onsuccess = (e) => {
      let imageResult = imageRequest.result;

      let a = document.createElement('a');
      a.href = imageResult.url;
      a.download = 'image.jpg';
      a.click();
    };
  }
}
