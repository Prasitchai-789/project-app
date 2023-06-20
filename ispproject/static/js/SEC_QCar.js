$(document).ready(function () {




  
    $('#method_Sale').on('click', function () {
      Swal.fire({
        title: 'เพิ่มคิว <span class=" text-warning">ขาย</span>',
        html: 'สเเกนบัตรเพื่อค้นหาข้อมูล',
        input: 'number',
        
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'ค้นหา',
        cancelButtonText: 'ปิด',
        confirmButtonColor: '#F9D224 ',
        cancelButtonColor: '#B8B8B8',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {

          return fetch(`api/data-qcar.php?CardCode=${login}`)
            .then(response => {
              if (!response.ok) {
                $('#danger').get(0).play();
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {

              $('#danger').get(0).play();

              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          let numbercar=result.value[0].NumberCar;
          let CID = result.value[0].CID;

          Swal.fire({
                title: 'กรุณาตรวจสอบ',
                text: `ทะเบียน : ${numbercar}`,
                footer:"คุณต้องการเพิ่มคิวนี้หรือไม่ !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#F9D224',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, เพิ่มคิว',
                cancelButtonText: 'ยกเลิก',
          }).then((result) => {

              if (result.isConfirmed) {
                let method = "INSERT";
                let act = "Sale";

                $.ajax({
                  type: "POST",
                  url: "api/data-qcar.php",
                  data: {
                    "method":method,
                    "CID":CID,
                    "NumberCar":numbercar,
                    "act":act
                  },
                  success: function (response) {

                    let res = $.parseJSON(response);

                    if(res.status ===200){

                      $('#success').get(0).play();
                      Swal.fire({
                        icon : 'success',
                        title:'เพิ่มคิวเเล้ว !',
                        text :`ทะเบียน : ${numbercar}`,
                        showConfirmButton: false,
                        timer: 1500
                      })

                    }else{
                      $('#danger').get(0).play();
                        Swal.fire(
                          'เกิดข้อผิดพลาด !',
                          `ไม่สามารถเพิ่มคิวได้  \nเนื่องจาก : ${res.message}`,
                          'error'
                        )

                    }
                    
                    
                  }
                });

               
              }
          })
      })
        
    });

    $('#method_Buy').on('click', function () {

        Swal.fire({
            title: 'เพิ่มคิว <span class=" text-success">ซื้อ</span>',
            html: 'สเเกนบัตรเพื่อค้นหาข้อมูล',
            input: 'number',
            inputAttributes: {autocapitalize: 'off'},
            showCancelButton: true,
            confirmButtonText: 'ค้นหา',
            cancelButtonText: 'ปิด',
            confirmButtonColor: '#1BA744 ',
            cancelButtonColor: '#B8B8B8',
            showLoaderOnConfirm: true,
            preConfirm: (que) => {
              
              return fetch(`api/data-qcar.php?CardCode=${que}`)
              
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                 
                 
                  return response.json();
                })
                .catch(error => {
                  $('#danger').get(0).play();
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
          let numbercar=result.value[0].NumberCar;
          let CID = result.value[0].CID;
           
              Swal.fire({
                title: 'กรุณาตรวจสอบ',
                text: `ทะเบียน : ${numbercar}`,
                footer:"คุณต้องการเพิ่มคิวนี้หรือไม่ !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1BA744',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, เพิ่มคิว',
                cancelButtonText: 'ยกเลิก',
              }).then((result) => {
                if (result.isConfirmed) {

                  let method = "INSERT";
                  let act = "Buy";

                  $.ajax({
                    type: "POST",
                    url: "api/data-qcar.php",
                    data: {
                      "method":method,
                      "CID":CID,
                      "NumberCar":numbercar,
                      "act":act
                    },
                    success: function (response) {
                        
                      let res = $.parseJSON(response);
  
                      if(res.status ===200){
  
                        $('#success').get(0).play();
                        Swal.fire({
                          icon : 'success',
                          title:'เพิ่มคิวเเล้ว !',
                          text :`ทะเบียน : ${numbercar}`,
                          showConfirmButton: false,
                          timer: 1500
                        })
  
                      }else{
                        $('#danger').get(0).play();
                          Swal.fire(
                            'เกิดข้อผิดพลาด !',
                            `ไม่สามารถเพิ่มคิวได้  \nเนื่องจาก : ${res.message}`,
                            'error'
                          )
  
                      }
                      
                    }
                  });

                  
                }
              })
         })
        
    });
 


});  
