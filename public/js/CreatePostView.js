var CreatePostView = Backbone.View.extend({
  el: "#create-post-container",
  template: _.template(`
  <form id="new-post-form">
  <h5 style="font-size:20px; font-weight:bold; margin:0;">Create a New Post on PIXL</h5>
      <textarea name="image" placeholder="Enter image URL" required></textarea>
      <textarea name="caption" placeholder="Write a caption..." required></textarea>
      <button type="submit">Create Post</button>
    </form>
`),

  events: {
    //"click #create-post-button": "showPopup",
    //"submit #new-post-form": "createPost",
    //"click .popup-content": "stopPropagation",
    //"click #post-popup": "hidePopup",
    "submit #new-post-form": "createPost",
  },

  initialize: function () {
    this.render();
  },
  /*
  showPopup: function (event) {
    event.preventDefault();
    this.$el.find("#post-popup").removeClass("hidden");
  },

  stopPropagation: function (event) {
    event.stopPropagation();
  },
*/
  createPost: function (event) {
    event.preventDefault();

    var formData = new FormData(this.$el.find("#new-post-form")[0]);

    var caption = formData.get("caption");
    var imageFile = formData.get("image");

    if (!caption || !imageFile) {
      alert("Caption and image url are required!");
      return;
    }

    var userId = localStorage.getItem("userId");
    var userName = localStorage.getItem("userName");

    var data = {
      caption: caption,
      image: imageFile,
      userID: userId,
      userName: userName,
    };

    console.log("Creating post with data:", data);

    if (!caption || !imageFile || !userId || !userName) {
      return;
    }

    var self = this;
    $.ajax({
      url: "http://localhost:8000/api/create",
      contentType: "application/json", // Optional if the server expects JSON
      type: "POST",
      data: JSON.stringify(data), // Optional if sending data as JSON
      success: function (response) {
        var newPost = new PostModel({
          id: response.PostID,
          username: response.UserName, // Replace with actual username
          caption: caption,
          imageUrl: response.Image || "",
          likesCount: 0,
          comments: [],
        });

        postsView.collection.unshift(newPost);
        postsView.render();
        //self.hidePopup();

        //clear the form fields
        self.$el.find("#new-post-form input[type='file']").val("");
        self.$el.find("#new-post-form textarea").val("");
      },
      error: function (xhr, status, error) {
        console.error("Error uploading image:", error);
      },
    });
    //this.hidePopup();

    //this.$el.find("#new-post-form input[type='file']").val("");
    //this.$el.find("#new-post-form textarea").val("");
  },
  /*
  hidePopup: function (event) {
    event.preventDefault();
    this.$el.find("#post-popup").addClass("hidden");
  },
*/
  render: function () {
    this.$el.html(this.template());
    return this;
  },
});

/*
// CSS to hide the popup initially and style it
const styles = `
  .hidden {
    display: none;
  }
  .post-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
`;

var styleSheet = document.createElement("style");
styleSheet.setAttribute("type", "text/css");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
*/
var createPostView = new CreatePostView();

/* 

var CreatePostView = Backbone.View.extend({
  el: "#create-post-container",
  template: _.template(`
  <button id="create-post-button">Create Post</button>
  <div id="post-popup" class="post-popup hidden">
    <div class="popup-content">
      <h5>Create a New Post</h5>
      <form id="new-post-form">
        <input type="text" name="url" placeholder="Enter image URL" required>
        <textarea name="caption" placeholder="Write a caption..." required></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  </div>
`),

  events: {
    "click #create-post-button": "showPopup",
    "submit #new-post-form": "createPost",
    "click .popup-content": "stopPropagation",
    "click #post-popup": "hidePopup",
  },







*/
