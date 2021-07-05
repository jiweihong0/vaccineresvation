export default function dodelete(){
    let str =`取消請<<輸入身分證>><br>`
    str +=`身分證字號：<input type="text" id="id"><br>`;
    str += `<button id="sel">查詢</button><br>`;
    str +=`~~~~~~~一但取消請重新預約施打~~~~~~~<br>`
    $("#content").html(str);
    $("#sel").click(function () { 
        let data ={
            "id":$("#id").val(),
        } 
        console.log(data)
        axios.post("http://localhost/test2/back/delmem.php",Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            $("#content").html(response['message']);
        })
        .catch(err => {
            console.error(err); 
        })                     
    }); 
}
