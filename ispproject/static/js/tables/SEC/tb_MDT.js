$(document).ready(function () {
       

         var pusher = new Pusher('1a2a4978380ced71212c', {
         cluster: 'ap1'
         });
    
         var channel = pusher.subscribe('my-channel');
         channel.bind('my-event', function(data) {

            tb_MDT.ajax.reload();
         });
    let tb_MDT = $('#tb_MDT').DataTable({
      "pageLength":25,
        ajax:{
            url:"api/data-qcar.php",
            type:"POST",
            data:{
              "method":"SELECT",
              "topic":"Sale",
              "group":"MDT"

            }
          } ,
          columns: [
            { "data": "DataID" },
            { "data": "DataID" },
            { "data": "NumberCar" },
            { "data": "ScanTime" },
            
          ],
          columnDefs: [
                  
              { 'targets': [0],'visible': false},
              { 'orderData':[0], 'targets': [1] },
              { "targets": [1,2,3],"orderable": false}

           
          ]
  
    

    });


    tb_MDT.on( 'order.dt search.dt', function () {
      tb_MDT.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          cell.innerHTML = i+1;
      } );
  } ).draw();
    
});