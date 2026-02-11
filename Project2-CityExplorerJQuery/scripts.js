var users = [{ username: "admin", password: "adm" }];
var impressions = [];
var nextImpressionId = 1;

var pictures = [
  {
    id: 1,
    url: "Images/picture1.jpg",
    title: "Reduit Tilly",
    description: "Home to the Bavarian Army Museum's WW1 exibit.",
    likes: 0,
    comments: [],
    likedBy: []
  },
  {
    id: 2,
    url: "Images/picture2.jpg",
    title: "New Castle Neues Schloss",
    description: "The New Castle in Ingolstadt is a 15th-century Gothic palace that houses the Bavarian Army Museum.",
    likes: 0,
    comments: [],
    likedBy: []
  },
  {
    id: 3,
    url: "Images/picture3.jpg",
    title: "Audi Sportpark",
    description: "Football stadium home to FC Ingolstadt 04.",
    likes: 0,
    comments: [],
    likedBy: []
  },
  {
    id: 4,
    url: "Images/picture4.jpg",
    title: "Danube River",
    description: "The Danube river in Ingolstadt",
    likes: 0,
    comments: [],
    likedBy: []
  }
];

var currentUser = { username: "admin", password: "adm" };

function isLoggedIn() {
  return currentUser && currentUser.username;
}

function renderGallery() {
  var $container = $("#galleryContainer");
  if (!$container.length) return;

  $container.empty();

  for (var i = 0; i < pictures.length; i++) {
    var pic = pictures[i];
    if (!pic.likedBy) pic.likedBy = [];
    if (!pic.comments) pic.comments = [];

    var $item = $("<div>").addClass("gallery_item");
    var $img = $("<img>").attr("src", pic.url).attr("alt", pic.title);

    var $info = $("<div>").addClass("gallery_info");
    var $title = $("<h3>").text(pic.title);
    var $desc = $("<p>").text(pic.description);

    var $likeContainer = $("<div>").css({
      display: "flex",
      alignItems: "center",
      gap: "8px"
    });

    var userLiked = isLoggedIn() ? pic.likedBy.indexOf(currentUser.username) !== -1 : false;

    var $likeBtn = $("<button>").text(userLiked ? "Liked" : "Like").css({
      background: "white",
      color: "rgb(59,40,204)",
      border: "none",
      borderRadius: "8px",
      padding: "6px 10px",
      cursor: "pointer"
    });

    var $likesText = $("<p>").text("Likes: " + pic.likes);

    (function (picRef, $btnRef, $likesRef) {
      $btnRef.on("click", function () {
        if (!isLoggedIn()) {
          alert("Please log in before liking!");
          return;
        }

        var u = currentUser.username;
        var idx = picRef.likedBy.indexOf(u);

        if (idx !== -1) {
          picRef.likedBy.splice(idx, 1);
          picRef.likes = Math.max(0, picRef.likes - 1);
          $btnRef.text("Like");
        } else {
          picRef.likedBy.push(u);
          picRef.likes += 1;
          $btnRef.text("Liked");
        }

        $likesRef.text("Likes: " + picRef.likes);
      });
    })(pic, $likeBtn, $likesText);

    $likeContainer.append($likeBtn, $likesText);

    var $commentSection = $("<div>").addClass("comment_section");
    var $commentTitle = $("<h4>").text("Comments");
    var $commentList = $("<div>").addClass("comment_list");

    function fillComments(picRef, $listRef) {
      $listRef.empty();
      for (var j = 0; j < picRef.comments.length; j++) {
        var c = picRef.comments[j];
        $listRef.append($("<p>").text(c.user + ": " + c.text));
      }
    }

    fillComments(pic, $commentList);

    var $commentInput = $("<textarea>").attr("placeholder", "Write a comment...");
    var $submitBtn = $("<button>").text("Post Comment");

    (function (picRef, $inputRef, $listRef) {
      $submitBtn.on("click", function () {
        if (!isLoggedIn()) {
          alert("Please log in before commenting!");
          return;
        }

        var text = ($inputRef.val() || "").toString().trim();
        if (!text) return;

        picRef.comments.push({ user: currentUser.username, text: text });
        $inputRef.val("");
        fillComments(picRef, $listRef);
      });
    })(pic, $commentInput, $commentList);

    $commentSection.append($commentTitle, $commentList, $commentInput, $submitBtn);

    $info.append($title, $desc, $likeContainer, $commentSection);
    $item.append($img, $info);
    $container.append($item);
  }
}

$(document).ready(function () {
  if ($("#signupForm").length) {
    $("#signupForm").on("submit", function (e) {
      e.preventDefault();
      var username = $("#username").val().toString().trim();
      var password = $("#password").val().toString();
      var $message = $("#message");

      var userExists = users.find(function (u) {
        return u.username === username;
      });

      if (userExists) {
        $message.text("Username taken.");
        return;
      }

      users.push({ username: username, password: password });
      $message.text("Account created successfully! Redirecting to login...");
      $("#signupForm")[0].reset();

      setTimeout(function () {
        window.location.href = "login.html";
      }, 2000);
    });
  }

  if ($("#loginForm").length) {
    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      var username = $("#username").val().toString().trim();
      var password = $("#password").val().toString();
      var $message = $("#message");

      var user = users.find(function (u) {
        return u.username === username && u.password === password;
      });

      if (user) {
        currentUser = user;
        $message.text("Login successful!");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2000);
      } else {
        $message.text("Login failed. Try again or sign up");
      }
    });
  }

  renderGallery();

  if ($("#feedbackform").length) {
    $("#feedbackform").on("submit", function (e) {
      e.preventDefault();

      var firstname = $("#firstname").val().toString().trim();
      var lastname = $("#lastname").val().toString().trim();
      var country = $("#country").val().toString();
      var comment = $("#comment").val().toString();

      var rating = $('input[name="rating"]:checked').val() || "";
      var pagesvisited = $('input[name="pages"]:checked')
        .map(function () {
          return $(this).val();
        })
        .get();

      var impression = {
        id: nextImpressionId,
        name: firstname + " " + lastname,
        country: country,
        siterating: rating,
        pagesvisited: pagesvisited,
        comment: comment
      };

      impressions.push(impression);
      nextImpressionId += 1;

      $("#formmessage")
        .text("Thank you for your feedback!")
        .css({ background: "rgb(240, 255, 240)", color: "rgb(0, 128, 0)" });

      $("#feedbackform")[0].reset();
    });
  }
});