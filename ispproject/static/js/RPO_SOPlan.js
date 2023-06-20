$(document).ready(function () {
     sidebar();

   

     $('#IBWei,#OBWei').blur(function (e) { 
        this.type=''; this.lastValue=this.value; this.value=this.value==''?'':(+this.value).toLocaleString()
        $(this).val(this.value.toLocaleString()+ ' กิโลกรัม');
    });

    $('#IBWei,#OBWei').focus(function (e) { 
        this.type='number'; 
       // this.value=this.lastValue;
        $('#NetWei').val(Math.abs($('#OBWei').val().replace(/[^0-9\.]+/g,"")-Math.abs($('#IBWei').val().replace(/[^0-9\.]+/g,"")))).toLocaleString('th-TH', {maximumFractionDigits:2})+ ' กิโลกรัม' ;
    });
    $('#NetWei').click(function (e) { 
        let ib = Math.abs($('#IBWei').val().replace(/[^0-9\.]+/g,""));
        let ob =Math.abs($('#OBWei').val().replace(/[^0-9\.]+/g,""));
        let net =ob-ib;
        $(this).val(net.toLocaleString('th-TH', {maximumFractionDigits:2})+ ' กิโลกรัม');
    });
    

     // put ibwei ,obwei
        $('#IBWei,#OBWei').on('input',function() {
            let getIB =parseInt($('#IBWei').val().replace(/[^0-9\.]+/g,""));
            let getOB = parseInt($('#OBWei').val().replace(/[^0-9\.]+/g,""));
            let NetWei = getOB-getIB
            if(NetWei > 0 ){
                $('#NetWei').val(Math.abs(NetWei).toLocaleString('th-TH', {maximumFractionDigits:2})+ ' กิโลกรัม' );
                $('#IBWei').removeClass('is-invalid');
                $('#OBWei').removeClass('is-invalid');
                $('#btn_Weight').prop("disabled", false);
            }else if(getIB >getOB ){
                $('#IBWei').addClass('is-invalid');
                $('#btn_Weight').prop("disabled", true);
            }else {
                $('#IBWei').addClass('is-invalid');
                $('#OBWei').addClass('is-invalid');
                $('#btn_Weight').prop("disabled", true);
            }
            
        });



     // click in dataTables
     $(document).on("click",'.Weight', function (e) {

          let sopid=  $(this).data('id');
          e.preventDefault();
          $.ajax({
              type: "POST",
              url: "api/data-PRO-SOPlan.php",
              data: {"SOPID":sopid},
              success: function (response) {
                  let res = $.parseJSON(response);
                //   console.log(res); 
                  get_DetailSOPlan(res.data); 
              },
              error: function (response) {
                  
              }
          });
    
        });

        // click check-in  in dataTables
     $(document).on("click",' .check-in', function (e) {
        
        e.preventDefault();
        let sopid=  $(this).data('id');
        let number=  $(this).data('number');
        let status=  $(this).data('status');
        let setStatus ="W";
        if(status =='W'){
            setStatus = 'P';
        }
        // console.log(number);
        Swal.fire({
            title: 'คุณเเน่ใจหรือไม่ ?',
            text: number+"   มาถึงที่นี่แล้ว !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e83e8c',
            cancelButtonColor: '#5a5c69',
            confirmButtonText: 'ใช่, มาถึงแล้ว!'
          }).then((result) => {
            if (result.isConfirmed) {

                let method="CheckIn";

               

                $.ajax({
                    type: "POST",
                    url: "api/SOPlan_update.php",
                    data:{
                        "method":method,
                        "Status":setStatus,
                        "SOPID":sopid
                    },
                    
                    success: function (response) {
                        //  console.log(response);
                        // $(this).removeClass('btn-pink').addClass('btn-success');
               
                        // const swal= Swal.fire({
                        //     position: 'top-end',
                        //     icon: 'success',
                        //     title: "ดำเนินการเรียบร้อย",
                        //     text : `${number} มาถึงแล้ว`,
                        //     showConfirmButton: false,
                        //     timer: 1000,
                        //     timerProgressBar: true,
                        //     didOpen: (swal) => {
                        //       swal.addEventListener('mouseenter', Swal.stopTimer)
                        //       swal.addEventListener('mouseleave', Swal.resumeTimer)
                        //     }
                        //   })
                    }
                });
            }
          })
       
  
      });


     //    Form_WeightPlan submit
     $("#Form_WeightPlan").submit(function(event) {
          event.preventDefault();

          $('#btn_Weight').prop("disabled", true);
          let method ="RPO";
          let SOPID =$('#DT_SOPID').val();
          let GoodName =$('#DT_GoodName').val();
          let GoodID =$('#DT_GoodID').val();
          let DriverName =$('#DT_DriverName').val();
         

         
          let NumberCar =$('#DT_NumberCar').val();
          let IBWei =parseInt($('#IBWei').val().replace(/[^0-9\.]+/g,""));
          let OBWei =parseInt($('#OBWei').val().replace(/[^0-9\.]+/g,""));
          let NetWei =parseInt($('#NetWei').val().replace(/[^0-9\.]+/g,""));
          let Remarks =$('#DT_Remarks').val();
          let Recipient=$('#DT_Recipient').val();
            if(isNaN(IBWei)){
                $('#IBWei').focus();
                return;
            }else if(isNaN(OBWei)){
                $('#OBWei').focus();
                return;
            }
          
              $.ajax({
                  type: "POST",
                  url: "api/SOPlan_update.php",
                  data: {
                      "method":method,
                      "SOPID":SOPID,
                      "IBWei":IBWei,
                      "OBWei":OBWei,
                      "NetWei":NetWei,
                      "DriverName":DriverName,
                      "NumberCar":NumberCar,
                      "Recipient":Recipient,
                      "Remarks":Remarks
                  },
                  success: function (res) {
                      let data = $.parseJSON(res);
                     // console.log(data.data);
                      
                      if(data.status==200){
                          
                          if(NumberCar != "" && GoodName != "" && NetWei > 0 && GoodID != ""  ){

                            line_notify(NumberCar,GoodName,NetWei,GoodID,Remarks);
                            
                          }else{
                            alrt_success();
                            $('#Form_WeightPlan').trigger("reset");
                            $('#WeightPlanModal').modal('toggle');
                            $('#btn_Weight').prop("disabled", false); 
                          }
                          
                         
                      }else{
                          alrt_error(data.data);
                          $('#btn_Weight').prop("disabled", false);    
                      }
                  },
                  error:function (res) {
                      $('#btn_weight').prop("disabled", false);
                    //   console.log(res.statusText);
                      alrt_error(res.statusText);
                  }
              });
          
          return true;
     }); 
     
        
});



function sidebar() {
     $("#RPO_SOPlan").addClass('active');
     $("#collapseSOPlan").addClass('show');
     $('[data-target*="#collapsePO"]').addClass('collapsed');
     $('[href*="RPO_SOPlan.php"]').addClass('active');
}
 

function get_DetailSOPlan(objData) {
    
     $('#WeightPlanModal').on('shown.bs.modal', function () {

          $('#btn_Weight').prop("disabled", false);    
          $('#IBWei').removeClass('is-invalid');
          $('#OBWei').removeClass('is-invalid');
          
          $('#DT_SOPID').val(objData[0].SOPID);      
          $("#DT_SOPDate").val(objData[0].SOPDate);
          $("#IBWei").val(Math.abs(objData[0].IBWei).toLocaleString('th-TH', {maximumFractionDigits:2})+' กิโลกรัม');
          $("#OBWei").val(Math.abs(objData[0].OBWei).toLocaleString('th-TH', {maximumFractionDigits:2})+' กิโลกรัม');
          $("#NetWei").val(Math.abs(objData[0].NetWei).toLocaleString('th-TH', {maximumFractionDigits:2})+' กิโลกรัม');
        //   console.log($('#DT_GoodID').val(objData[0].GoodID));
          $('#DT_GoodID').val(objData[0].GoodID);
          $('#DT_GoodName').val(objData[0].GoodName);
          $('#DT_AmntLoad').val(Math.abs(objData[0].AmntLoad).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม');     
          $('#DT_CustName').val(objData[0].CustName);      
          $('#DT_NumberCar').val(objData[0].NumberCar);      
          $('#DT_DriverName').val(objData[0].DriverName);      
          $('#DT_Remarks').val(objData[0].Remarks);
          $('#DT_Recipient').val(objData[0].Recipient);


        
     
     });
    
 }

 function line_notify(NumberCar,GoodName,NetWei,GoodID,Remarks){
    $.ajax({
        type: "POST",
        url: "api/notify_rpo.php",
        data: {
            "method": "SOPlan",
            "NotifID": 1004,
            "NumberCar":NumberCar,
            "GoodID":GoodID,
            "GoodName":GoodName,
            "NetWei":NetWei,
            "Remarks":Remarks,
        },

        success: function(response) {

            var obj = $.parseJSON(response);

            var jsonStr = obj.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
                return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
            });
            
            obj = JSON.parse(jsonStr);
            // console.log(obj.status);
            if(obj.status){
                alrt_success();
                $('#Form_WeightPlan').trigger("reset");
                $('#WeightPlanModal').modal('toggle');
                $('#btn_Weight').prop("disabled", false);    
            }else{

                alrt_error('Cannot Send Line Message');
                $('#Form_WeightPlan').trigger("reset");
                $('#WeightPlanModal').modal('toggle');
                $('#btn_Weight').prop("disabled", false);   
            }
           
        }
    });
 }



