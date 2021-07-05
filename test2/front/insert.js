export default function insert(){
    axios.get("http://localhost/test2/back/seltaiwan.php")
        .then(res => {
            let response = res['data'];
            switch (response['status']) {
                case 200:
                    let rows = response['result'];
                    let str = `<table>`;
                    rows.forEach(element => {
                        str += "<tr>";
                        str += "<td>" + `<input type="radio" id="id" name="id" value="` + element['country'] + `">` + "</td>";
                        str += "<td>" + element['country'] + "</td>";
                        str += "</tr>";
                    });
                    str += `</table>`;
                    str += `<button id="showupdate">確定</button>`;
                    $("#content").html(str);
                    $("#showupdate").click(function () { 
                        let data={
                            "id":$("input[name=id]:checked").val(),
                        }
                        console.log(data)
                        axios.post("http://localhost/test2/back/Conposi.php",Qs.stringify(data))
                        .then(res => {
                            let response = res['data'];
                            switch (response['status']) {
                                case 200:
                                    let rows = response['result'];
                                    let str = `<table>`;
                                    rows.forEach(element => {
                                        str += "<tr>";
                                        str += "<td>" + `<input type="radio" id="aa" name="aa" value="` + element['country'] + `">` + "</td>";
                                        str += "<td>" + element['country'] + "</td>";
                                        str += "</tr>";
                                    });
                                    str += `</table>`;
                                    str += `<button id="showinsert">確定</button>`;
                                    $("#content").html(str);
                                    $("#showinsert").click(function () { 
                                        let data1={
                                            "id":$("input[name=aa]:checked").val(),
                                        }
                                        console.log(data1)
                                        axios.post("http://localhost/test2/back/Conposi2.php",Qs.stringify(data1))
                                        .then(res => {
                                            let response = res['data'];
                                            switch (response['status']) {
                                                case 200:
                                                    let bb=response['result'][0]
                                                    let str = `縣市：` + bb['posi'] + `<br>`;
                                                    str += `地區：` + bb['country'] + `<br>`;
                                                    str += `姓名：<input type="text" id="6" ><br>`;
                                                    str += `手機號碼：<input type="text" id="3" ><br>`;
                                                    str += `身分證：<input type="text" id="4" ><br>`;
                                                    str += `<input type="hidden" id="5" value="否" >`;
                                                    str += `選擇疫苗<input type="radio" id="id" name="id" value="AZ">:AZ`;
                                                    str += `<input type="radio" id="id" name="id" value="高端" >:高端`;
                                                    str += `<input type="hidden" id="id" value="` + bb['id'] + `"><br>`
                                                    str += `<button id="doupdate">預約</button>`;
                                                    $("#content").html(str);     
                                                    $("#doupdate").click(function(){
                                                        console.log(checkID($("#4").val()))
                                                        if (checkID($("#4").val())==true){
                                                            let data = {
                                                                "country": bb['country'] ,
                                                                "posi": bb['posi'],
                                                                "phone": $("#3").val(),
                                                                "id": $("#4").val(),
                                                                "doit": $("#5").val(),
                                                                "name": $("#6").val(),
                                                                "wh":$("input[name=id]:checked").val(),
                                                            };
                                                            axios.post("http://localhost/test2/back/member.php",Qs.stringify(data))
                                                            .then(res => {
                                                                let response = res['data'];
                                                                $("#content").html(response['message']);
                                                            })
                                                            .catch(err => {
                                                               console.error(err); 
                                                            })
                                                        }
                                                        else{
                                                            $("#content").html("身分證無效");
                                                        }
                                                        
                                                    })  
                                                    break;
                                                default:
                                                    break;
                                            }
                 
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
            .catch(err => {
                console.error(err); 
            })
}
function checkID(idStr){
  
    var letters = new Array('A', 'B', 'C', 'D', 
        'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 
        'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
        'X', 'Y', 'W', 'Z', 'I', 'O');
    
    var multiply = new Array(1, 9, 8, 7, 6, 5, 
                             4, 3, 2, 1);
    var nums = new Array(2);
    var firstChar;
    var firstNum;
    var lastNum;
    var total = 0;
   
   
    var regExpID=/^[a-z](1|2)\d{8}$/i; 
    
    if (idStr.search(regExpID)==-1) {
      
      alert("請仔細填寫身份證號碼");
     return false;
    } else {
      
      firstChar = idStr.charAt(0).toUpperCase();
      lastNum = idStr.charAt(9);
    }
   
    for (var i=0; i<26; i++) {
      if (firstChar == letters[i]) {
        firstNum = i + 10;
        nums[0] = Math.floor(firstNum / 10);
        nums[1] = firstNum - (nums[0] * 10);
        break;
      } 
    }
   
    for(var i=0; i<multiply.length; i++){
      if (i<2) {
        total += nums[i] * multiply[i];
      } else {
        total += parseInt(idStr.charAt(i-1)) * 
                 multiply[i];
      }
    }
    
    if ((10 - (total % 10))!= lastNum) {
      alert("身份證號碼寫錯了！");
      return false;
    } 
    return true;
  }