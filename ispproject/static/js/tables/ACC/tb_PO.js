$(document).ready(function() {





    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        tb_PO.ajax.reload();

    });







    let tb_PO = $('#tb_PO').DataTable({
        "pageLength": 50,

        ajax: {
            url: "api/data-PO.php",
            type: "POST",
            data: {
                "method": "ACC_SELECT"
            }
        },
        columns: [

            { "data": "DocuDate" },
            { "data": "BillID" },
            { "data": "VendorName" },
            { "data": "DocuTypeName" },
            { "data": "VendorCarID" },
            {
                "data": "GoodIB",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "GoodIB" },
            {
                "data": "GoodOB",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "GoodOB" },
            {
                "data": "GoodNet",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "GoodNet" },
            {
                "data": "Price2",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "Price2" },
            {
                "data": "Amnt2",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 });
                }
            },
            { "data": "Amnt2" },
            
            {
                "data": "POInvID",
                "render": function(data, type, row) {
                    return `<button class="edit_po btn btn-xxs btn-circle"data-poinvid="${data}" ><i class="far fa-edit text-warning"></i></button>`;

                }
            },
        ],
        "order": [
            [1, "desc"]
        ],
        columnDefs: [

            { 'targets': [6, 8, 10, 12,14], 'visible': false },
            // { 'orderData': [0], 'targets': [1] },
            // { "targets": [0, 15], "orderable": false },

            // {
            //     targets: [5],
            //     render: function(data, type, row) {
            //         return data.substr(0, 17);
            //     }
            // },
            // { "width": "10%", "targets": [0, 1, 3, 9, 10, 11] },
            { className: "text-center", targets: "_all" },
            { type: 'natural-nohtml', targets: [6, 8, 10, 12] }




        ]

    });
});