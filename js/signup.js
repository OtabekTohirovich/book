async function signUprRequest(formData) {
    const req = await fetch ("https://bookzone-v2.herokuapp.com/api/sign-up", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await req.json();
    return data;
}


function SignUp(firstName, lastName, email, password, phone, lang, role) {
    try {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.lang = lang;
        this.role = role;
    }
    catch(err){
        console.log(err);
    }
}

const form = document.forms[0];
try {
    form.addEventListener("submit", (e)=> {
        e.preventDefault();
        const formData = new SignUp(
            form.firstName.value,
            form.lastName.value,
            form.email.value,
            form.password.value,
            form.phone.value,
            form.lang.value,
            form.role.value
        );
        console.log(formData);
        signUprRequest(formData).then((data) => {
            console.log(data);
        })
    })
}
catch (err){
    console.log(err);
}