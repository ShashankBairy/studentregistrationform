// Submit Form

// while using event listener , i couldn't add the records to the table
// thats why i used onclick event in html   
function submitForm(){
    var fname = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    var email = document.getElementById("email").value;
    var contact = document.getElementById("contact").value;

    // checks whether all the inputs are present or not
    if (!fname || !roll || !email || !contact) {
        alert("Please fill in all fields before submitting.");
        return; // Exit function if any field is empty
    }

    // check for duplicate roll numbers
    var table = document.getElementById("studentTable");
    for(var i=1; i<table.rows.length ; i++){
        var existingroll = table.rows[i].cells[1].textContent;
        if (existingroll === roll){
            alert("Roll Number already exists.");
            return;
        } 
    }

    var newrow = document.createElement("tr");
    newrow.innerHTML = `<td>${fname}</td><td>${roll}</td><td>${email}</td><td>${contact}</td><td><button class="editbtn" onclick="editStudent(this)">Edit</button><button class="deletebtn" onclick="deleteStudent(this)">Delete</button></td>`;
    
    // adding student details to the table
    
    table.appendChild(newrow);

    // sorting rows based on roll number
    
    sortTable(table,1);

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
}

// sorting the table by roll numbers

function sortTable(table, column) {
    var rows = Array.from(table.rows).slice(1);
    rows.sort((a, b) => parseInt(a.cells[column].textContent) - parseInt(b.cells[column].textContent));
    rows.forEach(row => table.appendChild(row));
}

// edit option

function editStudent(button){
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    var fname = cells[0].innerHTML;
    var roll = cells[1].innerHTML;
    var email = cells[2].innerHTML;
    var contact = cells[3].innerHTML;

    document.getElementById("name").value = fname;
    document.getElementById("roll").value = roll;
    document.getElementById("email").value = email;
    document.getElementById("contact").value = contact;

    var submitButton = document.getElementById("submitBtn");
    submitButton.textContent = "Save";

    //Add an event listener to the submit button for saving edited data
    submitButton.removeEventListener("click", submitForm);
    submitButton.addEventListener("click", saveEditedData);

    row.parentNode.removeChild(row);
}

function saveEditedData() {

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";

    document.getElementById("submitBtn").textContent = "Submit";

    // Add event listener for submitting new data
    var submitButton = document.getElementById("submitBtn");
    submitButton.removeEventListener("click", saveEditedData);
    submitButton.addEventListener("click", submitForm);
}


// delete option

function deleteStudent(button){
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    
}
