$(document).ready(function() {
 

    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        tb_CarOutside.ajax.reload();

    });
    let tb_CarOutside = $('#tb_CarOutside').DataTable({
        "rowCallback": function(row, data) {

            if (data.ActivityType == "Sale") {
                $(row).addClass('bg-warning-fade');
            } else if (data.ActivityType == "Buy") {
                $(row).addClass('bg-success-fade');
            }
        },
        "pageLength": 25,
        "ordering": false,
        ajax: {
            url: "api/data-CheckCar.php",
            type: "POST",
            data: {
                "method": "SELECT",
                "Status": "W",

            }
        },
        columns: [

            { "data": "DataID" },
            { "data": "DataID" },
            { "data": "NumberCar" },
            { "data": "TypeCarName" },
            {
                "data": "ActivityType",
                "render": function(data, type, row) {
                    if (data == 'Sale') {
                        return 'ขาย';
                    } else if (data == 'Buy') {
                        return 'ซื้อ';

                    }

                }
            },
            { "data": "ScanTime" },
            {
                "data": "DataID",
                "render": function(data, type, row) {

                    return `<button class="chkin btn  btn-circle btn-xxs"data-id="${row.DataID}" ><i class="fas fa-check-circle"></i></button>`;
                }
            },


        ],
        columnDefs: [

            { 'targets': [0], 'visible': false },
            { 'orderData': [0], 'targets': [1] },
            { className: "text-center", targets: "_all" },
            { "width": "10%", "targets": [1, 3, 4, 5, 6] },
            // { "width": "60%", "targets": 2 },
            // { "width": "30%", "targets": 3 },

        ]

    });
    tb_CarOutside.on('order.dt search.dt', function() {
        tb_CarOutside.column(1, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();



    $('#tb_CarOutside tbody').on('click', 'button.chkin', function() {

        var data = tb_CarOutside.row($(this).closest('tr')).data();

        Swal.fire({

            title: 'กรุณาตรวจสอบ',
            text: `ทะเบียน : ${data.NumberCar}`,
            footer: "คุณเเจ้งว่ารถคันนี้อยู่ในพื้นที่เเล้วหรือไม่ !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C9931',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ถูกต้อง',
            cancelButtonText: 'ยกเลิก',

        }).then((result) => {

            if (result.isConfirmed) {


                $.ajax({

                    type: "POST",
                    url: "api/data-CheckCar.php",
                    data: {

                        "method": "UPDATE",
                        "DataID": data.DataID,
                        "Status": "P",
                    },
                    success: function(response) {

                        let res = $.parseJSON(response);

                        if (res.status === 200) {

                            $('#success').get(0).play();

                            Swal.fire({
                                icon: 'success',
                                title: 'รับเข้าพื้นที่ !',
                                text: `ทะเบียน : ${data.NumberCar}`,
                                showConfirmButton: false,
                                timer: 1500
                            })

                        } else {

                            $('#danger').get(0).play();
                            Swal.fire(
                                'เกิดข้อผิดพลาด !',
                                `ไม่สามารถรับเข้าได้ \nเนื่องจาก : ${res.message}`,
                                'error'
                            )
                        }
                    }
                });
            }
        })

    });
});