 $(document).ready(function () {
      

        var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            tb_wei.ajax.reload();
        });



        var tb_wei= $('#Weight').DataTable({
            "fnDrawCallback": function() {
            },

            ajax: "api/data-SO.php",
            columns: [
                { "data": "GoodName" }, 
                { "data": "Weight"},
                { "data": "Weight",
                    "render": function ( data, type, row ) {
                        return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                    }   
                },
              
               

                ],
                columnDefs: [
                
                    { 'targets': [1],'visible': false},
                    { 'orderData':[1], 'targets': [2] },
                 
                    { type: 'natural-nohtml', targets: [2]}
                ]
        });


        $('#dt_wei').on('change', function () {
          
            tb_wei.destroy();
           let dt = $(this).val();
          
            tb_wei= $('#Weight').DataTable({
                ajax:{
                    url:"api/data-SO.php",
                    type:"POST",
                    data:{
                        "dt":dt
                    }
                } ,
                columns: [
                    { "data": "GoodName" }, 
                { "data": "Weight"},
                { "data": "Weight",
                    "render": function ( data, type, row ) {
                        return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                    }   
                },
              
    
                    ],
                    columnDefs: [
                       
                      
                    { 'targets': [1],'visible': false},
                    { 'orderData':[1], 'targets': [2] },
                    { type: 'natural-nohtml', targets: [2]}
                     ]

            });

            
                
        });

        var tb_list= $('#SO_List').DataTable({
           

            ajax: "api/data-LAB-SO.php",
            columns: [
                    { "data": "GoodName" }, 
                    { "data": "NumberCar" }, 
                    { "data": "DriverName" }, 
                    { "data": "CustName" }, 
                    { "data": "Recipient" }, 
                    { "data": "AmntLoad" ,
                        "render": function ( data, type, row ) {
                            return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                        }
                    }, 
                    { "data": "NetWei",
                        "render": function ( data, type, row ) {
                            return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                        }    
                    }, 
                ],
                columnDefs: [
                
                    // { 'targets': [1],'visible': false},
                    // { 'orderData':[1], 'targets': [2] },
                 
                    // { type: 'natural-nohtml', targets: [2]}
                ]
        });

        $('#dt_list').on('change', function () {
          
            tb_list.destroy();
           let dt = $(this).val();
          
            tb_list= $('#SO_List').DataTable({
                ajax:{
                    url:"api/data-LAB-SO.php",
                    type:"POST",
                    data:{
                        "dt":dt
                    }
                } ,
                columns: [
                    { "data": "GoodName" }, 
                    { "data": "NumberCar" }, 
                    { "data": "DriverName" }, 
                    { "data": "CustName" }, 
                    { "data": "Recipient" }, 
                    { "data": "AmntLoad" ,
                        "render": function ( data, type, row ) {
                            return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                        }
                    }, 
                    { "data": "NetWei",
                        "render": function ( data, type, row ) {
                            return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' กิโลกรัม';
                        }    
                    }, 
                    
              
    
                ],
                columnDefs: [
                    // { 'targets': [1],'visible': false},
                    // { 'orderData':[1], 'targets': [2] },
                    // { type: 'natural-nohtml', targets: [2]}
                ]

            });

            
                
        });
 });


 