const slider = document.getElementById("rating");

slider.addEventListener("input", function() {
  const value = (this.value - this.min) / (this.max - this.min);
  const thumbColor = `hsl(${value * 120}, 100%, 50%)`;
  this.style.setProperty("--thumb-color", thumbColor);
});

const submitButton = document.getElementById("submit");
const commentBox = document.getElementById("comment");

submitButton.addEventListener("click", function() {
  const rating = slider.value;
  const comment = commentBox.value;
  // submit the rating and comment data to the server here
});