// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("signupForm");

//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("http://13.211.231.249:3000/users", {
//         // Replace with the actual endpoint
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.status === 409) {
//         // Email already exists
//         alert("Email already exists - Error 409");
//       } else if (response.ok) {
//         const user = data.data.user;
//         alert(
//           "ID: " + user.id + "\nName: " + user.name + "\nEmail: " + user.email
//         );
//       } else {
//         alert("An error occurred: " + response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://13.211.231.249:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        console.error("Error Data:", errorData); // Log the error data
      }

      const data = await response.json();

      if (response.status === 409) {
        alert("Email already exists - Error 409");
      } else if (response.ok) {
        const user = data.data.user;
        alert(
          "ID: " + user.id + "\nName: " + user.name + "\nEmail: " + user.email
        );
      } else {
        alert("An error occurred: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
