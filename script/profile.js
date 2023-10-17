const pencilIcon = document.getElementById("pencil");
const personIcon = document.getElementById("person");
const iconsContainer = document.getElementById("icons-container");
personIcon.addEventListener("mouseover", () => {
  pencilIcon.classList.remove("d-none");
  personIcon.classList.add("d-none");
});

pencilIcon.addEventListener("mouseleave", () => {
  pencilIcon.classList.add("d-none");
  personIcon.classList.remove("d-none");
});

const openImageUploader = function openImageUploader() {
  const imageUpload = document.getElementById("image-upload");
  imageUpload.click();
  pencilIcon.click();
};

//
let profileImageDataURL;

const displaySelectedImage = function () {
  const imageUpload = document.getElementById("image-upload");
  const selectedImage = imageUpload.files[0];

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target.result;
      profileImageDataURL = dataURL; // Store the profile image data URL
      styleContainer = iconsContainer.style;
      styleContainer.backgroundImage = `url('${profileImageDataURL}')`;
      styleContainer.backgroundSize = "contain";
      styleContainer.backgroundRepeat = "no-repeat";
      styleContainer.backgroundPosition = "center center";
    };
    reader.readAsDataURL(selectedImage);
  }
};
