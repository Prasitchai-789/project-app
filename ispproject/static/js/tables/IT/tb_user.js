$(document).ready(function() {


    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {

        tb_user.ajax.reload();

    });


    let tb_user = $('#tb_user').DataTable({

        pageLength: 25,
        ajax: {
            type: "POST",
            url: "api/data-user.php",
        },
        columns: [
            { "data": "Username" },
            { "data": "Password" },
            { "data": "DeptName" },
            { "data": "EmpName" },
            {
                "data": "UID",
                "render": function(data, type, row) {

                    return `<button class="edit_user btn btn-xxs btn-circle"data-uid="${data}" ><i class="far fa-edit text-warning"></i></button>` +
                        `<button class="del_user btn btn-xxs btn-circle"data-uid="${data}" ><i class="far fa-trash-alt text-danger"></i></button>`;
                }
            },

        ],
        columnDefs: [

            { "targets": [4], "orderable": false },
            // { 'targets': [0], 'visible': false },
            // { 'orderData': [0], 'targets': [1] },
            // { "width": "10%", "targets": 1 },
            // { "width": "60%", "targets": 2 },
            // { "width": "30%", "targets": 3 },
            { className: "text-center", targets: "_all" },
            {
                targets: 1,
                render: function(data, type, row) {
                    return data.substr(0, 19);
                }
            }

        ]

    });



});