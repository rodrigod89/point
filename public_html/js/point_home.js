$(document).ready(function() {
    $("#tableProyects").click(function() {
        Projects.forEach(function(p) {
            $("#" + p.id).click(function() {
                localStorage.setItem('project', JSON.stringify(p));
                window.top.location.href = 'project.html';
            });
        });
    });
    $("#lLogOut").click(function(){
        localStorage.clear();
        window.top.location.href = 'index.html';
    });
});

var user;
window.onload = checkUser();

function checkUser() {
    console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user') == undefined) {
        window.top.location.href = 'index.html';
    } else {
        var u = jQuery.parseJSON(localStorage.getItem('user'));
        user = new User(u.id, u.name, u.password, u.username, u.email);
        document.getElementById("lUsername").innerHTML = user.name;
        Project.get(0, 20, {}, function getFinished(data) {
            var table = new Array();
            var args = new Array();
            var i = 0;
            table[0] = "#";
            table[1] = "Name";
            data.forEach(function(element) {
                args[i] = new Array();
                args[i][0] = element.id;
                args[i][1] = element.id;
                args[i][2] = element.name;
                i++;
            });
            var h = generateTable(table, args);
            document.getElementById("tableProyects").innerHTML = h;
        });
        Department.get(0,10,{},function getfinish(data){});
        Task.get(0,10,{"user_id": user.id,"state_id":1},function getfinish(data){
            var table = new Array();
            var args = new Array();
            var i = 0;
            table[0] = "#";
            table[1] = "Name";
            table[2] = "Points";
            table[3] = "Department";
            table[4] = "Component";
            table[5] = "Project";
            data.forEach(function(element){
                args[i] = new Array();
                args[i][0] = element.id;
                args[i][1] = element.id;
                args[i][2] = element.name;
                args[i][3] = element.points;
                args[i][4] = Departments[element.department_id].name;
                if(args[i][5]!=null){
                    args[i][5] = element.component_id;
                }else{
                    args[i][5] = "N/A";
                }
                args[i][6] = Projects[element.project_id].name;   
                console.log(element);
                i++;
            });
            var h = generateTableFunction(table,args,"loadSpec");
            document.getElementById("tableTasks").innerHTML = h;
        });
        
    }
}




