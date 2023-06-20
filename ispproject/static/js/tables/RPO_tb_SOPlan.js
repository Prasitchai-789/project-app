$(document).ready(function() {
    var idxRow;
             $('#tb_SOplan tbody').on( 'click', 'tr', function () {
                 idxRow  = table.row( this ).index();
             });
 
    // Setup - add a text input to each footer cell
    $('#tb_SOplan tfoot tr').clone(true).addClass('filters').appendTo( '#tb_SOplan thead' );
    var table = $('#tb_SOplan').DataTable( {
     "fnDrawCallback": function() {
        
       
        // $('[data-status=F]').parent('div').click(false);

 
     },
        order: [[0, 'desc']],
        
        responsive: true,
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function() {
            var api = this.api();
            // For each column
            api.columns().eq(0).each(function(colIdx) {
             if ( colIdx == 4||colIdx == 5||colIdx == 6||colIdx == 7||colIdx == 8) return;
                // Set the header cell to contain the input element
                var cell = $('.filters th').eq($(api.column(colIdx).header()).index());
                var title = $(cell).text();
                $(cell).html( '<input type="text" class="form-control" placeholder="'+title+'" />' );
                // On every keypress in this input
                $('input', $('.filters th').eq($(api.column(colIdx).header()).index()) )
                    .off('keyup change')
                    .on('keyup change', function (e) {
                        e.stopPropagation();
                        // Get the search value
                        $(this).attr('title', $(this).val());
                        var regexr = '({search})'; //$(this).parents('th').find('select').val();
                        var cursorPosition = this.selectionStart;
                        // Search the column for that value
                        api
                            .column(colIdx)
                            .search((this.value != "") ? regexr.replace('{search}', '((('+this.value+')))') : "", this.value != "", this.value == "")
                            .draw();
                        $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition);
                    });
            });
        },
       ajax: "api/data-PRO-SOPlan.php",
         columns: [
             { "data": "GoodName" },
             { "data": "NumberCar" },
             { "data": "DriverName" },
             { "data": "CustName" },
             { "data": "AmntLoad", 
                "render": function ( data, type, row ) {
                    
                 return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' kg';
                }
             },
             { "data": "NetWei"},
             { "data": "NetWei" ,
            //    className: "text-primary",
                "render": function ( data, type, row ) {

                    let NetWei=Math.abs(data);
                     return '<td >'+NetWei.toLocaleString('th-TH', {maximumFractionDigits:2})+' kg</td>' ;
               }
                
            },
            { "data": "Status"},
            { "data": "SOPID",
                "render": function ( data, type, row ) {

                    if(row.Status == 'W'){
                        return      '<button class="btn btn-pink btn-xs check-in"data-id="'+data+'" data-status="'+row.Status+'"data-number="'+row.NumberCar+'"><i class="fas fa-map-marker-alt"></i></button>'+
                                    '<button class="ml-1 btn btn-warning btn-xs Weight"data-id="'+data+'" data-toggle="modal" data-target="#WeightPlanModal"><i class="fas fa-weight"></i></button>';
                    }else{
                        return      '<button class="btn btn-success btn-xs check-in"data-id="'+data+'"data-status="'+row.Status+'" data-number="'+row.NumberCar+'"><i class="fas fa-map-marker-alt"></i></button>'+
                                    '<button class="ml-1 btn btn-warning btn-xs Weight"data-id="'+data+'" data-toggle="modal" data-target="#WeightPlanModal"><i class="fas fa-weight"></i></button>';
                    }
                    
                }
            },
            
         ],
         
        columnDefs: [
           {"orderable": false, "targets": [4,7,8] },
           {
               targets: 6,
               createdCell: function (td, cellData, rowData, row, col) {
               if ( cellData > 0 ){
                    $(td).addClass('text-success font-weight-bold');
                    
               }
                
            }
          },
          { 'orderData':[5], 'targets': [6] },
          {
              'targets': [5,7],
              'visible': false,
              'searchable': false
          },
          { type: 'natural-nohtml', targets: 4}
        

       ]
    });
 

 
        var pusher = new Pusher('1a2a4978380ced71212c', {
          cluster: 'ap1'
        });
    
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
             table.ajax.reload();
        });



       




 });
 
