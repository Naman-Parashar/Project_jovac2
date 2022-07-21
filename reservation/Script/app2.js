var namev, phonev, emailv, f1v, datev, timev;

function readFom() {
  namev = document.getElementById("name").value;
  phonev = document.getElementById("phone").value;
  emailv = document.getElementById("email").value;
  f1v = document.getElementById("f1").value;
  datev = document.getElementById("date").value;
  timev = document.getElementById("time").value;
  console.log(namev, phonev, emailv, f1v, datev, timev);
}

document.getElementById("read").onclick = function (event) {
  event.preventDefault();
  document.querySelector("#formr").style.display = "none";
  if (document.getElementById("phone").value == "") {
    alert("Please Enter a phone number ");
    document.getElementById("formr").reset();
  } else {
    if (document.getElementById("phone").value.match("[0-9]{10}")) {
      firebase.database().ref("Hres").once('value', function(snapshot) {
        if (snapshot.hasChild( document.getElementById("phone").value)) {
          document.querySelector("#formr").style.display = "block";
      readFom();

      firebase
        .database()
        .ref("Hres/" + phonev)
        .on("value", function (snap) {
          document.getElementById("name").value = snap.val().name;
          //   document.getElementById("phone").value=snap.val().phone;
          document.getElementById("email").value = snap.val().email;
          document.getElementById("f1").value = snap.val().people;
          document.getElementById("date").value = snap.val().date;
          document.getElementById("time").value = snap.val().time;
        });
        }
        else{
          alert("This phone is NOT registered");
        }
    });
    } else {
      alert("Please enter a valid phone number");
      document.getElementById("formr").reset();
    }
  }
};

document.getElementById("update").onclick = function (event) {
  event.preventDefault();

  if (
    document.getElementById("name").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("f1").value == "" ||
    document.getElementById("date").value == "" ||
    document.getElementById("time").value == ""
  ) {
    alert("Please complete full Form");
    document.getElementById("formr").reset();
  } else {
      if (
        document
          .getElementById("email")
          .value.match("^[a-z0-9._]+@gmail\.[a-z]{2,}$")
      ) {
        readFom();

        firebase
          .database()
          .ref("Hres/" + phonev)
          .update({
            name: namev,
            email: emailv,
            people: f1v,
            date: datev,
            time: timev,
          });
        alert("Data Update");
        document.getElementById("formr").reset();
        document.querySelector("#formr").style.display = "none";
      }
      else{
        alert("Please enter a valid email");
    }
}
};

document.getElementById("delete").onclick = function (event) {
  event.preventDefault();
  readFom();

  firebase
    .database()
    .ref("Hres/" + phonev)
    .remove();
  alert("Data Deleted");
  document.getElementById("formr").reset();
  document.querySelector("#formr").style.display = "none";
};
