$(function(){
    load();
    $("#title").on("keydown",function(event){
        if (event.keyCode === 13){
           if($(this).val()===""){
               alert("请输入您要的操作");
           }else{
            var local = getDate();
            //    console.log(local);
               local.push({title: $(this).val(), done: false});
               saveDate(local);
               load();
               $(this).val("");
           }
        }
    });
    $("ol,ul").on("click","a",function(){
        // alert(11);
        var data = getDate();
        // console.log(data);
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index,1);
        saveDate(data);
        load();

    });

    $("ol,ul").on("click","input",function(){
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);
        saveDate(data);
        load();
    });
    
    function getDate(){
        var data = localStorage.getItem("todolist");
        if (data !== null){
            return JSON.parse(data);
        } else {
            return [];
        }
    }


    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }


    function load () {
        var data = getDate();
        // console.log(data);
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each (data, function(i,n){
            // console.log(i);
            // console.log(n);
            if(n.done){
                $("ul").prepend("<li><input type='checkbox' checked = 'checked'> <p>"+n.title+"</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox' > <p>"+n.title+"</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})