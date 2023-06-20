
$(document).ready(function() {
    
   

    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        tb_PO.ajax.reload();

    });

    let tb_PO = $('#tb_PO').DataTable({
        "pageLength": 25,

        ajax: {
            url: "static/api/data-PO.php",
            type: "POST",

        },
        columns: [
            { "data": "BillID" },
            { "data": "DocuDate" },
            { "data": "BillID" },
            { "data": "TypeCarName" },
            { "data": "VendorCarID" },
            { "data": "VendorCode" },
            { "data": "VendorName" },
            { "data": "GoodIB" },
            {
                "data": "GoodIB",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "GoodOB" },

            {
                "data": "GoodOB",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "GoodNet" },

            {
                "data": "GoodNet",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            {
                "data": "Price1",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }

            },
            { "data": "Grade" },
            { "data": "Impurity" },
            {
                "data": "POInvID",
                "render": function(data, type, row) {
                    return `<button class="edit_po btn btn-xxs btn-circle"data-poinvid="${data}" ><i class="far fa-edit text-warning"></i></button>` +
                        `<button class="del_po btn btn-xxs btn-circle"data-poinvid="${data}" ><i class="far fa-trash-alt text-danger"></i></button>`;
                }
            },


        ],
        "order": [
            [1, "desc"]
        ],
        columnDefs: [

            { 'targets': [7, 9, 11], 'visible': false },
            // { 'orderData': [0], 'targets': [1] },
            { "targets": [0, 16], "orderable": false },

            {
                targets: [5],
                render: function(data, type, row) {
                    return data.substr(0, 17);
                }
            },
            { "width": "10%", "targets": [0, 1, 3, 9, 10, 11] },
            { type: 'natural-nohtml', targets: [6, 8, 10] }




        ]

    });

    tb_PO.on('order.dt search.dt', function() {
        tb_PO.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

});