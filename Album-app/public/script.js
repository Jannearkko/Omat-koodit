const result = document.getElementById('result-container');
const baseUrl = `${window.location.origin}/api`;

/* eslint-disable-next-line no-unused-vars */
const submitForm = async (form) => {
  try {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    /* eslint-disable no-undef */
    const res = await axios.post(`${baseUrl}/albums/submit`, formObject);

    if (res.status === 201) {
      await fetchAlbums();
      form.reset();
    } else {
      console.error('Error creating album:', res.data.msg);
    }
  } catch (error) {
    console.log(error);
    const errorMessage = error.response && error.response.data.msg ? error.response.data.msg : 'Could not submit form';
    result.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`; // Display the actual error message
  }
  return false;
};
// formatter function to format updatedAt timestamp to 'dd.mm.yyyy'
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// fetch all albums and render them to client. Display text msg if operation unsuccessful.
const fetchAlbums = async () => {
  try {
    const res = await axios.get(`${baseUrl}/albums`);
    const data = res.data;
    console.log(data);

    if (!Array.isArray(data.albums)) {
      throw new Error('Data is not an array');
    }

    const albums = data.albums.map((album) => {
      const formattedDate = formatDate(album.updatedAt);
      return `<ul>
                <li>ID: ${album.albumId}</li>
                <li>Artist: ${album.artist}</li>
                <li>Title: ${album.title}</li>
                <li>Year: ${album.year}</li>
                <li>Genre: ${album.genre}</li>
                <li>Track count: ${album.tracks}</li>
                <li>Last modified: ${formattedDate}</li>
             </ul>`;
    });
    result.innerHTML = albums.join('');
  } catch (error) {
    console.log(error);
    result.innerHTML = '<div class="alert alert-danger">Could not fetch data</div>';
  }
};

// add event listener to the delete button. Delete album by albumId, refresh all albums and clear the input field.
const deleteAlbumButton = document.getElementById('deleteAlbum');
const deleteAlbumIdInput = document.getElementById('deleteAlbumId');

deleteAlbumButton.addEventListener('click', async () => {
  try {
    const user = 'janne';
    const albumId = deleteAlbumIdInput.value;
    const res = await axios.delete(`${baseUrl}/albums/${albumId}?user=${user}`);
    const data = res.data;

    if (data.success) {
      console.log('Album deleted successfully:', data);
      deleteAlbumIdInput.value = '';
      fetchAlbums();
    } else {
      // Handle the case where the deletion was not successful
      console.error('Error deleting album:', data.msg);
    }
  } catch (error) {
    // Handle any network or server errors
    console.error('Error deleting album:', error);
  }
});

const updateAlbumButton = document.getElementById('updateAlbum');
const inputContainer = document.getElementById('inputContainer');

updateAlbumButton.addEventListener('click', () => {
  const inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('id', 'albumIdInput');
  inputField.setAttribute('placeholder', 'Enter Album ID');

  const findAlbumButton = document.createElement('button');
  findAlbumButton.setAttribute('id', 'findAlbumButton');
  findAlbumButton.textContent = 'Find Album';
  findAlbumButton.setAttribute('style', 'margin-top:5px;');

  findAlbumButton.addEventListener('click', async () => {
    const albumIdInput = document.getElementById('albumIdInput');
    const albumId = albumIdInput.value;

    try {
      const res = await axios.get(`${baseUrl}/albums/${albumId}`);
      const data = res.data;

      if (data.success) {
        // Create a new form
        const albumForm = document.createElement('form');
        albumForm.setAttribute('id', 'albumForm');

        // Iterate through the album data and create input fields with placeholder values
        for (const key in data.data) {

          if (Object.prototype.hasOwnProperty.call(data.data, key) && key !== '_id' && key !== '__v') {
            const inputField = document.createElement('input');
            inputField.setAttribute('type', 'text');
            inputField.setAttribute('id', 'inputField');
            inputField.setAttribute('name', key); // Use the key as the input name
            inputField.setAttribute('placeholder', data.data[key]); // Set placeholder value from the album data
            inputField.setAttribute('style', 'margin-top:5px;');
            albumForm.appendChild(inputField);
          }
        }

        // Create a button to update the album
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.setAttribute('style', 'margin-top:5px;');
        updateButton.setAttribute('id', 'updateButton');
        albumForm.appendChild(updateButton);

        // this is the button that actually makes the PUT request using axios
        updateButton.addEventListener('click', async (e) => {
          e.preventDefault();

          const formData = {}; // key value pairs to send as req.body with axios
          const formElems = document.getElementById('albumForm').elements;
          
          // loop all the inputFields and add values
          for (let i = 0; i < formElems.length; i++) {
            const elem = formElems[i];
            if (elem.name && elem.type === 'text') {
              formData[elem.name] = elem.value;
            }
          }
          
          try {
            const res = await axios.put(`${baseUrl}/albums/${albumId}`, formData);
            const data = res.data;

            if (data.success) {
              console.log('Album successfully updated.', data);
              // fetch new set of albums
              fetchAlbums();

              // remove all the update input fields and buttons by removing the parent element.
              document.getElementById('inputContainer').remove();

            } else {
              console.error('Failed to update album', data.msg);
            }
          } catch (error) {
            console.error('Error updating album: ', error);
          }
        });

        // Append the form to the inputContainer
        inputContainer.appendChild(albumForm);
      }
    } catch (error) {
      console.error('Error fetching album:', error);
    }
  });

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(findAlbumButton);
});



