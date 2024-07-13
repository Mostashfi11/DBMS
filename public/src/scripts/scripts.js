document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const uname = signupForm.querySelector('input[name="name"]').value;
        const ufmnname = signupForm.querySelector('input[name="fmnname"]').value;            
        const uemail = signupForm.querySelector('input[name="email"]').value;
        const ucontact = signupForm.querySelector('input[name="contact"]').value;
        const uaddr = signupForm.querySelector('input[name="address"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirm-password"]').value;
  
        const data = {
          name: uname,
          fmnname: ufmnname,
          email: uemail,
          contact: ucontact,
          addr: uaddr,
          pass: password
        };
  
        if (uname && ufmnname && uemail && ucontact && uaddr && password && confirmPassword) {
          if (password !== confirmPassword) {
            alert('Passwords do not match.');
          } else {
            try {
              const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
  
              const responseData = await res.json();
              console.log("Result from signup page:", responseData);
              if (res.ok) {
                window.location.href = 'home.html';
              } else {
                alert(responseData.message || 'Signup failed.');
              }
            } catch (e) {
              console.error("Error:", e.message);
              alert('Failed to sign up. Please try again later.');
            }
          }
        } else {
          alert('All fields are required.');
        }
      });
    }
  });
  