export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees")
        this.updateEmloyeeButton = document.getElementById("update")
        this.nameInput = document.getElementById("name")
        this.departmentInput = document.getElementById("department")
        this.salaryInput = document.getElementById("salary")
    }
    addAllEmployeesToUI(emlpoyees) {
        // <tr>

        //     <td>Mustafa Murat Coşkun</td>
        //     <td>Bilişim</td>
        //     <td>4000</td>
        //     <td>1</td>
        //     <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
        //     <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
        // </tr>
        let result = "";
        emlpoyees.forEach((emp) => {
            result += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>${emp.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>
            `
        })
        this.employeesList.innerHTML=result;
    }
    clearInput(){
        this.nameInput.value="";
        this.departmentInput.value="";
        this.salaryInput.value="";
    }
    addEmployeeToUİ(emp){
        this.employeesList.innerHTML+=`
                <tr>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>${emp.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>
            `;
        
    }

    deleteEmp(element){
        element.remove();
    }
    toggleUpdateButton(target){
        if(this.updateEmloyeeButton.style.display==="none"){
            this.updateEmloyeeButton.style.display="block"
            this.addEmployeeInfoToInfos(target);
        }else{
            this.updateEmloyeeButton.style.display="none";
            this.clearInput();
        }
    }
    addEmployeeInfoToInfos(target){
        const children=target.children
        this.nameInput.value=children[0].textContent;
        this.departmentInput.value=children[1].textContent
        this.salaryInput.value=children[2].textContent
    }
    updateEmp(emp,parent){
        parent.innerHTML=`
        <tr>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>
        <td>${emp.id}</td>
        <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
        <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
    </tr>
    `;
    this.clearInput();
    this.updateEmloyeeButton.style.display="none";
    }
}