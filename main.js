
let students = [];

let editIndex = "";

if (sessionStorage.getItem("students")) {

    students = JSON.parse(
        sessionStorage.getItem("students")
    );

    displayStudents();
}


// Add and Update Student

studentForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const studentNameInput = Studentname.value;
    const studentemail = email.value;
    const studentphone = phone.value;
    const studentcourse = course.value;
    const studentgender = gender.value;


    // Check validation

    if (
        studentNameInput &&
        studentemail &&
        studentphone &&
        studentcourse &&
        studentgender
    ) {

        if (editIndex === "") {

            students.push({

                Studentname: studentNameInput,
                email: studentemail,
                phone: studentphone,
                course: studentcourse,
                gender: studentgender

            });

        }

        else {

            students[editIndex] = {

                Studentname: studentNameInput,
                email: studentemail,
                phone: studentphone,
                course: studentcourse,
                gender: studentgender

            };

        }

        editIndex = "";

        sessionStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

        studentForm.reset();

    }

    else {

        alert("Please fill the form completely");

    }

});


// Display Students

function displayStudents() {

    studentTable.innerHTML = "";

    students.forEach((student, index) => {

        studentTable.innerHTML += `

            <tr>

                <th>${index + 1}</th>

                <td>${student.Studentname}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>${student.course}</td>

                <td>${student.gender}</td>

                <td>

                    <button
                        onclick="editStudent(${index})"
                        class="btn btn-warning">

                        Edit

                    </button>

                    <button
                        onclick="deleteStudent(${index})"
                        class="btn btn-danger">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// Edit Student

function editStudent(studentIndex) {

    const studentDetails = students[studentIndex];

    Studentname.value = studentDetails.Studentname;

    email.value = studentDetails.email;

    phone.value = studentDetails.phone;

    course.value = studentDetails.course;

    gender.value = studentDetails.gender;

    editIndex = studentIndex;

    console.log("Edit Student", studentDetails);

}


// Delete Student

function deleteStudent(studentIndex) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(studentIndex, 1);

        sessionStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

}


search.addEventListener("input", () => {

    const searchValue = search.value.toLowerCase();

    studentTable.innerHTML = "";

    students.forEach((student, index) => {

        if (
            student.Studentname.toLowerCase().includes(searchValue)
        ) {

            studentTable.innerHTML += `

                <tr>

                    <th>${index + 1}</th>

                    <td>${student.Studentname}</td>

                    <td>${student.email}</td>

                    <td>${student.phone}</td>

                    <td>${student.course}</td>

                    <td>${student.gender}</td>

                    <td>

                        <button
                            onclick="editStudent(${index})"
                            class="btn btn-warning">

                            Edit

                        </button>

                        <button
                            onclick="deleteStudent(${index})"
                            class="btn btn-danger">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }

    });

});
