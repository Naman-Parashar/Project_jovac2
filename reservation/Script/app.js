var namev, phonev, emailv, f1v, datev,timev;

function readFom() {
  namev = document.getElementById("name").value;
  phonev = document.getElementById("phone").value;
  emailv = document.getElementById("email").value;
  f1v = document.getElementById("f1").value;
  datev = document.getElementById("date").value;
  timev = document.getElementById("time").value;
  // console.log(namev, phonev, emailv, f1v, datev,timev);
}

document.getElementById("insert").onclick = function (event) {
    event.preventDefault();
    if(document.getElementById("name").value==""||
    document.getElementById("phone").value==""||
    document.getElementById("email").value==""||
    document.getElementById("f1").value==""||
    document.getElementById("date").value==""||
    document.getElementById("time").value=="")
    {
        alert("Please complete the Form");
        document.getElementById("formr").reset();
    }
    
    else{

    if(document.getElementById("phone").value.match("[0-9]{10}")){
      firebase.database().ref("Hres").once('value', function(snapshot) {
        if (snapshot.hasChild( document.getElementById("phone").value)) {
          alert("This phone is already registered");
        }
        else{
          if(document.getElementById("email").value.match("^[a-z0-9._]+@gmail\.[a-z]{2,}$"))
          {
              readFom();
  
          firebase
          .database()
          .ref("Hres/" + phonev)
          .set({
            name: namev,
            phone: phonev,
            email: emailv, 
            people:f1v,
            date: datev,
            time: timev,
          });
          //   enable alert
          document.querySelector(".alert").style.display = "block";
      
          //   remove the alert
          setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
          }, 3000);
      
          document.getElementById("formr").reset();
          }
          else{
              alert("Please enter a valid email");
              document.getElementById("formr").reset();
          }
        }
    }); 
    }
    else {
        alert("Please enter a valid phone number");
        document.getElementById("formr").reset();
    }
}
};
