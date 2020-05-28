//const likesButton = document.querySelector("#btn-like");
//
//likesButton.addEventListener("click", async function (e) {
//  e.preventDefault();
//  const imgId = likesButton.dataset.id;
//  const response = await fetch(`/images/${imgId}/like`, {
//    method: "POST",
//  });
//  const data = await response.json();
//  document.querySelector("#likes-count").innerHTML = data.likes;
//});
//
//const deleteButton = document.querySelector("#btn-delete");
//deleteButton.addEventListener("click", async function (e) {
//  e.preventDefault();
//  const response = confirm("are you sure you want to delete this image?");
//  if (response) {
//    const imgId = deleteButton.dataset.id;
//    await fetch(`/images/${imgId}`, {
//      method: "DELETE",
//    });
//    deleteButton.classList.remove("btn-danger").add("btn-success");
//    deleteButton.childNodes[0].classList.remove("fa-times").add("fa-check");
//    deleteButton.innerHTML += "<span>Deleted!</span>";
//  }
//});

$(function () {
  $("#post-comment").hide();
  $("#btn-toggle-comment").click((e) => {
    e.preventDefault();
    $("#post-comment").slideToggle();
  });

  $("#btn-like").click(function (e) {
    e.preventDefault();
    let imgId = $(this).data("id");
    $.post("/images/" + imgId + "/like").done((data) => {
      $(".likes-count").text(data.likes);
    });
  });

  $("#btn-delete").click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm("Are you sure you want to delete this image?");
    if (response) {
      let imgId = $(this).data("id");
      $.ajax({
        url: "/images/" + imgId,
        type: "DELETE",
      }).done(function (result) {
        $this.removeClass("btn-danger").addClass("btn-success");
        $this.find("i").removeClass("fa-times").addClass("fa-check");
        $this.append("<span>Deleted!</span>");
      });
    }
  });
});
