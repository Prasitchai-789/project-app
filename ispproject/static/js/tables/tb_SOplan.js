$(document).ready(function() {
   var idxRow;
            $('#tb_SOplan tbody').on( 'click', 'tr', function () {
                idxRow  = table.row( this ).index();
            });

   // Setup - add a text input to each footer cell
   $('#tb_SOplan tfoot tr').clone(true).addClass('filters').appendTo( '#tb_SOplan thead' );
   var table = $('#tb_SOplan').DataTable( {
    "fnDrawCallback": function() {
    
        $('.switch_status').bootstrapToggle();
      
       
        $('[data-status=F]').parent('div').click(false);
        // $('[data-status=P]').parent('div').click(false);
       
        $('.switch_status').on("change", function(event) {
           
            
            let getStatus= $(this).attr('data-status');
            let getSOPID= $(this).attr('data-id');
            let setStatus = "";
            // console.log(getStatus);
            //  console.log(getSOPID);
                
                if(getStatus!='C'){
                    setStatus='C'
                    $(this).attr('data-status',setStatus);
                }else{
                    setStatus='W'
                    $(this).attr('data-status',setStatus);
                }
                $.ajax({
                    type: "POST",
                    url: "api/SOPlan_status.php",
                    data: {
                        "SOPID":getSOPID,
                        "Status":setStatus,
                        "idxRow":idxRow
                    },
                    success: function (response) {
                        let res = $.parseJSON(response);
                        if(res.status===200){
                         // alrt_success();
                        }else{
                            alrt_error(res.data) ;
                        }
                        //console.log(res.status);
                     
                       
                    }
                });
                event.preventDefault();
            
        });
         

    },
       order: [[ 0, "desc" ], [ 1, "desc" ]],
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
      ajax: "api/data-soplan.php",
        columns: [
            { "data": "SOPDate" },
            { "data": "GoodName" },
            { "data": "NumberCar" },
            { "data": "CustName" },
            { "data": "NetWei" , 
                "render": function ( data, type, row ) {
                return Math.abs(data).toLocaleString('th-TH', {maximumFractionDigits:2}) +' kg';
                }  
            },
            { "data": "Status",
                "render": function ( data, type, row ) {
                    if(data=='C'){
                        return '<input class="switch_status " data-size="xs" type="checkbox" data-id="'+row.SOPID+'" data-status="'+data+'" data-on="In Waiting" data-off="Cancel" data-toggle="toggle" data-onstyle="warning" data-offstyle="danger">';
                    }else if (data=='F'){
                        return '<input  class="switch_status "data-size="xs" type="checkbox"  data-id="'+row.SOPID+'" data-status="'+data+'"data-off="Finish"   data-offstyle="success" >';
                        
                    }else if (data=='P'){
                        return '<input  class="switch_status "data-size="xs" type="checkbox"  data-id="'+row.SOPID+'" data-status="'+data+'"data-off="In Process"   data-offstyle="info" >';
                        
                    }else{
                        return '<input class="switch_status "data-size="xs" type="checkbox" checked  data-id="'+row.SOPID+'" data-status="'+data+'"data-on="In Waiting" data-off="Cancel" data-toggle="toggle" data-onstyle="warning" data-offstyle="danger" >';
                    }
                }
            },
            { "data": "SOPID",
                "render": function ( data, type, row ) {
                    return '<button class="btn btn-primary btn-xs detail_plan"data-id="'+data+'" data-toggle="modal" data-target="#DetailPlanModal"><i class="fas fa-search-plus" ></i></button>';
                }
            },
            { "data": "Status"},
            { "data": "NetWei"},
        ],
       columnDefs: [
         {"orderable": false, "targets": [6] },
         { 'targets': [7,8],'visible': false,'searchable': false},
        
         { 'orderData':[7], 'targets': [5] },
         { 'orderData':[8], 'targets': [4] },
         { type: 'natural-nohtml', targets: 8},
         {targets: 4,
            createdCell: function (td, cellData, rowData, row, col) {
            if ( cellData > 0 ){
                 $(td).addClass('text-success font-weight-bold');
            }
             
         }
       }
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

