// Register new user
function register() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.sendEmailVerification()
                .then(() => alert("Verification email sent! Please verify before logging in."));
        })
        .catch(error => alert(error.message));
}

// Login user
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            if (userCredential.user.emailVerified) {
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("Please verify your email before logging in.");
            }
        })
        .catch(error => alert(error.message));
}

// Logout user
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Redirect to login
    });
}

// Display current user info
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("userEmail").innerText = `Logged in as: ${user.email}`;
    }
});
