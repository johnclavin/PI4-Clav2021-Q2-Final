//user id for profile page and login check
let user = '-MkKZ3xntDW2YZjLXIMZ'; // my database id

//Handlers || Contollers
function home(context) {
  fetch('https://k-q2-pi4-final-default-rtdb.firebaseio.com/events.json')
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      // get the template as a handlebars string
      console.log(data);

      //take data and turn it into an array of objects
      let furnitureArray = Object.entries(data);

      console.log(furnitureArray);
      //[ [furnitureID,object],[furnitureID,object],[furnitureID,object]]
      //[object,object,object]
      furnitureArray = furnitureArray.map(function (innerArray) {
        let [furnitureID, furnitureObject] = innerArray;
        furnitureObject.id = furnitureID;
        return furnitureObject;
      });
      context.furniture = furnitureArray;
      if (user.length != 0) {
        context.loggiedIn = true;
      } else {
        context.loggiedIn = false;
      }
      context
        .loadPartials({
          header: '../views/header.hbs',
        })
        .then(function () {
          this.partial('./views/home.hbs', function (details) {
            console.log('went home!');
          });
        });
    })
    .catch((err) => {
      console.log(err);
      //change html to show an error has occured
    });
}
function createPost(context) {
  console.log('form Submitted!!!!');
  console.log(this);
  //the form submit comes here through the parameters of the post itself.
  //the value comes in as proprties of the params (parameters) obj
  //we then get the form data by accessing them as such
  let data = {
    make: this.params.make,
    model: this.params.model,
    year: this.params.year,
    description: this.params.description,
    price: this.params.price,
    imageUrl: this.params.imageUrl,
    material: this.params.material,
    userID: user,
  };

  let url =
    'https://k-q2-pi4-final-default-rtdb.firebaseio.com/events.json';
  let headers = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch(url, headers)
    .then(function (response) {
      //console.log(response);
      if (response.status == 200) {
        console.log('DONE!!');
        home(context);
      } else {
        console.log(response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
