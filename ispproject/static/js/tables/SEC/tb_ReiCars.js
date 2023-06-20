$(document).ready(function() {
   

    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {

        tb_ReiCars.ajax.reload();

    });

    var tb_ReiCars = $('#tb_ReiCars').DataTable({
        "pageLength": 25,
        ajax: {
            url: "api/data-qcar.php",
            type: "POST",
            data: {
                "method": "SELECT",
                "topic": "Buy"
            }
        },
        columns: [
            { "data": "DataID" },
            { "data": "DataID" },
            { "data": "NumberCar" },
            { "data": "TypeCarName" },
            { "data": "ScanTime" },


        ],
        columnDefs: [

            { 'targets': [0], 'visible': false },
            { 'orderData': [0], 'targets': [1] },
            { "targets": [1, 2, 3, 4], "orderable": false },
            // { "width": "10%", "targets": 1 },
            // { "width": "60%", "targets": 2 },
            // { "width": "30%", "targets": 3 },


        ]



    });

    tb_ReiCars.on('order.dt search.dt', function() {
        tb_ReiCars.column(1, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

});