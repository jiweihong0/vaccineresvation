export default function update(){
    let str =`修改請<<輸入身分證>><br>`
        str +=`身分證字號：<input type="text" id="id"><br>`;
        str += `<button id="sel">查詢</button>`;
        $("#content").html(str);
        $("#sel").click(function () { 
            let data ={
                "id":$("#id").val(),
            } 
            axios.post("http://localhost/test2/back/Conid.php",Qs.stringify(data))
            .then(res=>{
                let response=res['data'];
                switch (response['status']) {
                    case 200:
                        let bb=response['result'][0]
                        let str = `姓名：<input type="text" id="1" value="` + bb['name'] + `"><br>`;
                        str += `電話：<input type="text" id="2" value="` + bb['phone'] + `"><br>`;
                        str += `選擇疫苗<input type="radio" id="id" name="id" value="AZ">:AZ`;
                        str += `<input type="radio" id="id" name="id" value="高端" >:高端`;
                        str += `<input type="hidden" id="4" value="` + bb['id'] + `"><br>`
                        str += `<button id="doupdate">修改</button>`;
                        $("#content").html(str);
                        $("#doupdate").click(function(){
                            let data = {
                                "name": $("#1").val(),
                                "phone": $("#2").val(),
                                "wh": $("input[name=id]:checked").val(),
                                "id": $("#4").val(),
                            };
                            
                            axios.post("http://localhost/test2/back/change.php",Qs.stringify(data))
                            .then(res => {
                                let response = res['data'];
                                $("#content").html(response['message']);
                            })
                            .catch(err => {
                               console.error(err); 
                            })
                        })  
    
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
