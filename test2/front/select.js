export default function Select(){
    let str =`查詢請<<輸入身分證>><br>`
    str +=`身分證字號：<input type="text" id="id"><br>`;
    str += `<button id="sel">查詢</button>`;
    $("#content").html(str);
    $("#sel").click(function () { 
        let data ={
            "id":$("#id").val(),
        } 
        console.log(data)
        axios.post("http://localhost/test2/back/Conid.php",Qs.stringify(data))
        .then(res=>{
            let response=res['data'];
            switch (response['status']) {
                case 200:
                    let bb=response['result'][0]
                   
                    let str="<div>姓名:"+bb['name']+"</div><br>";
                    str+="<div>選擇接種疫苗:"+bb['wh']+"</div><br>";
                    str+="<div>當天是否施打:"+bb['doit']+"</div><br>";
                   
                    $("#content").html(str);
    

                    break;
                default:
                    $("#content").html(response['message']);
                    break;
            }
        })
        .catch(err=>{
            console.error(err);
        })
        
    });
}
