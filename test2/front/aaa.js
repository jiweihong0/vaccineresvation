export default function aaa(){
    let str =`更新資料<br>`
        str +=`帳號：<input type="text" id="id1"><br>`;
        str +=`密碼：<input type="text" id="passwd"><br>`;
        str += `<button id="sel">查詢</button>`;
        $("#content").html(str);   
        $("#sel").click(function () { 
            if ($("#id1").val()=="root" & $("#passwd").val()=="123"){
                axios.get("http://localhost/test2/back/DoSel.php")
                .then(res=>{
                    let response=res['data'];
                    switch (response['status']) {
                        case 200:
                            let rows = response['result'];
                            let str = `<table>`;
                            str+="<tr>"+"<td>"+`姓名`+"</td>"+"<td>"+`id`+"</td>"+"<td>"+`疫苗`+"</td>"+"<td>"+`施打情形`+"</td>"+"<td>"+`輸入日期<input type="text" id="1">`+"<td>"+"</tr>"
                            rows.forEach(element => {
                                str += "<tr>";
                                str += "<td>" + element['name'] + "</td>";
                                str += "<td>" + element['id'] + "</td>";
                                str += "<td>" + element['wh']+ "</td>";
                                str += "<td>" + `當天是否施打<input type="checkbox" name="item[]" value="` + element['phone'] + `">` + "</td>";
                                str += "</tr>";
                            });
                            str += `</table>`;
                            str += `<button id="ans">確認</button>`;
                            $("#content").html(str);
                            $("#ans").click(function () { 
                                var a = new Array;
                                $('input[name="item[]"]:checkbox:checked').each(function(i) {
                                    a[i] = this.value;
                                });
                                let data = {
                                    "item":a,
                                    "doit":"是",
                                    "date":$("#1").val(),
                                    
                                }
                                console.log(data)
                                axios.post("http://localhost/test2/back/abc.php",Qs.stringify(data))
                                .then(res => {
                                    let response = res['data'];
                                    $("#content").html(response['message']);
                                })
                                .catch(err => {
                                   console.error(err); 
                                })
                                
                            });
                           
                            break;
                        default:
                            $("#content").html(response['message']);
                            break;
                    }
                })
                .catch(err=>{
                    console.error(err);
                })
            }
            else{
                $("#content").html("您不適護理人員"); 
            }
            
        });
}
