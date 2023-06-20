
$(document).ready(function () {
      var pusher = new Pusher('1a2a4978380ced71212c', {
            cluster: 'ap1'
      });

      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function (data) {

            tb_ListCountTrain.ajax.reload();

      });

      let tb_ListCountTrain = $('#tb_ListCountTrain').DataTable({
            ajax: {
                  type: "POST",
                  url: "api/data-ListCountTrain.php",
            },
            order: [[1, "desc"]],
            columns: [
                  { "data": "CTGroupWork" },
                  { "data": "CTDateStart" },
                  { "data": "CTTimeStart" },
                  { "data": "CTDateEnd" },
                  { "data": "CTTimeEnd" },
                  { "data": "CTAmnt" },
                  {
                        "data": "CTID",
                        "render": function (data, type, row) {

                              return `<button class="del btn btn-xxs btn-circle"data-id="${data}" ><i class="far fa-trash-alt text-danger"></i></button>`;
                        }
                  },

            ],
            columnDefs: [

                  //     { "targets": [1], "orderable": false },
                  // { 'targets': [0], 'visible': false },
                  // { 'orderData': [0], 'targets': [1] },
                  // { "width": "10%", "targets": 1 },
                  // { "width": "60%", "targets": 2 },
                  // { "width": "30%", "targets": 3 },
                  { className: "text-center text-nowrap", targets: "_all" }

            ]

      });

      $(document).on('click', '.del', function (e) {
            e.preventDefault();
            let CTID = $(this).attr('data-id');
            Swal.fire({
                  title: 'ยืนยันการลบ?',
                  text: "กรุณากด ยืนยัน เพื่อลบ!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'ยืนยัน'
            }).then((result) => {
                  if (result.isConfirmed) {
                        $.ajax({
                              type: "POST",
                              url: "api/data-ListCountTrain.php",
                              data: {
                                    action: 'del',
                                    CTID: CTID
                              },
                              success: function (response) {
                                    let res = $.parseJSON(response);
                                    if (res.status == 200) {
                                          Swal.fire(
                                                'ลบเเล้ว !',
                                                'รายการนับได้ถูกลบเเล้ว',
                                                'success'
                                          )
                                    } else {
                                          Swal.fire(
                                                'ลบไม่สำเร็จ !',
                                                'กรุณาลองใหม่',
                                                'error'
                                          )
                                    }

                              }
                        });

                  }
            })
      });


})
