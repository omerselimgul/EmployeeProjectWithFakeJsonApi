import { Request } from "./request"
import { UI } from "./ui"
// elementleri seçme

const form = document.getElementById("employee-form")
const nameInput = document.getElementById("name")
const departmentInput = document.getElementById("department")
const salaryInput = document.getElementById("salary")
const employeesList = document.getElementById("employees")
const updateEmloyeeButton = document.getElementById("update")


//obje olusturma
const request = new Request("http://localhost:3000/Employee");

const ui = new UI();
var updateState = null;

// request.get()
// .then(employee=> console.log(employee))
// .catch(err=> console.log(err));


// request.post({name:"kaan",department:"pazarlama",salary:6000})
// .then(employee=>console.log(employee))
// .catch(err=> console.log(err))

// request.put({name:"Selim",department:"Bilisim",salary:7000},1)
// .then(res=>console.log(res))
// .catch(err=>console.log(err));

// request.delete(3)
// .then(res=> console.log(res))
// .catch(err=>console.log(err));

eventListener();

function eventListener() {
    document.addEventListener("DOMContentLoaded", gelAllEmployees);
    form.addEventListener("submit", addEmployee)
    employeesList.addEventListener("click", updateOrDelete)
    updateEmloyeeButton.addEventListener("click", updateEmployee)
}

function gelAllEmployees() {
    request.get()
        .then(emlpoyees => {
            ui.addAllEmployeesToUI(emlpoyees);
        })
        .catch(err => console.log(err))
}
function addEmployee(e) {
    const employeeName = nameInput.value.trim();
    const employeeDeparment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDeparment === "" || employeeSalary === "") {
        alert("Lütfen Tüm Alanlari Doldurun")
    } else {
        request.post({ name: employeeName, department: employeeDeparment, salary: Number(employeeSalary) })
            .then(emp => {
                ui.addEmployeeToUİ(emp)
            })
            .catch(err => console.log(err))
        ui.clearInput();
    }


    e.preventDefault();
}

function updateOrDelete(e) {
    if (e.target.id === "delete-employee") {
        //silme
        deleteEmployee(e.target);
    } else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement)
    }
}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
        .then(message => {
            ui.deleteEmp(targetEmployee.parentElement.parentElement)

        })
        .catch(err => console.log(err))
}
function updateEmployeeController(targete) {
    ui.toggleUpdateButton(targete)
    if (updateState === null) {
        updateState = {
            updateid: targete.children[3].textContent,
            updateParent: targete
        }
    } else {
        updateState = null;
    }
}
function updateEmployee() {
    if (updateState) {
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())

        }
        request.put(data, updateState.updateid)
            .then(updatedEmp => {
                ui.updateEmp(updatedEmp, updateState.updateParent)

                return "hello";
            })
            .then(mess=> updateState=null)
            .catch(err => console.log(err))
    }
}