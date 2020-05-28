// place 'focus' state on name field
document.getElementById('name').focus();


// JOB ROLE SECTION:

// define DOM Elements for job role, and hide "other" input until needed
const otherTitle = document.getElementById('other-title')
otherTitle.style.display = 'none';
const selectTitle = document.getElementById('title');

// event listener for when user clicks "Other" on job role dropdown
selectTitle.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherTitle.style.display = "";
  } else {
    otherTitle.style.display = "none";
  }
});

