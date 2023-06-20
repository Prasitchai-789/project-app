$(document).ready(function() {

    $('#Price').on('input', function() {
        let GoodNet = parseInt($('#GoodNet').val().replace(/[^0-9\.]+/g, ""));
        let Price = $(this).val();
        let Amnt = Price * GoodNet;
        $('#Amnt').val(Amnt.toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');
    });


    $('#UPDATE_PO').submit(function(e) {
        e.preventDefault();
        $('#btn_UpdatePO').prop("disabled", true);
        let Price = $('#Price').val();
        let Amnt = parseInt($('#Amnt').val().replace(/[^0-9\.]+/g, ""));
        let GoodNet = parseInt($('#GoodNet').val().replace(/[^0-9\.]+/g, ""));
        let POInvID = $('#POInvID').val();
        let DocuType = $('#DocuType').val();
        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "ACC_UPDATE",
                "POInvID": POInvID,
                "Amnt2": Amnt,
                "Price2": Price,
                "DocuType": DocuType
            },

            success: function(response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {
                     notify_acc(1002, POInvID, Price, GoodNet);
                    AmntWins() ;
                    $('#btn_UpdatePO').prop("disabled", false);
                    $('#UPDATE_PO_Modal').modal('toggle');
                    $(this).trigger("reset");
                    alrt_success();
                } else {
                    $('#btn_UpdatePO').prop("disabled", false);
                    alrt_error(res);
                }
            },
            error: function(response) {
                $('#btn_UpdatePO').prop("disabled", false);
                alrt_error();
                console.log(response)
            }
        });

    });

    $(document).on('click', '.edit_po', function() {
        let poinvid = $(this).attr('data-poinvid');
        $('#POInvID').val(poinvid);
        $('#UPDATE_PO_Modal').modal('toggle');

        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "ACC_SELECT",
                "POInvID": poinvid

            },

            success: function(response) {

                let res = $.parseJSON(response);
                if (res.status === 200) {
                    let price = res.data[0].Price2;
                    if(price > 0 ){

                        $('#Price').val( parseFloat(res.data[0].Price2).toFixed(2));
                    }else{
                        $('#Price').val(0);
                    }
                    
                    $('#Amnt').val(Math.abs(res.data[0].Amnt2).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');
                    // $('#Amnt').val(res.data[0].Amnt2);
                    $('#GoodNet').val(Math.abs(res.data[0].GoodNet).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม')
                } else {
                    console.log(res);
                }
            }
        });

    });

    AmntWins() ;
    sidebar();
});




function sidebar() {

    $("#ACC_PO").addClass('active');
    $("#collapsePO").addClass('show');
    $('[data-target*="#collapseSO"]').addClass('collapsed');
    $('[href*="ACC_PO.php"]').addClass('active');
}


function notify_acc(notifyid, poinvid, price2, goodnet) {

    $.ajax({
        type: "POST",
        url: "api/notify_acc.php",
        data: {
            "method": "PO",
            "NotifID": notifyid,
            "POInvID": poinvid,
            "Price2": price2,
            "GoodNet": goodnet
        },

        success: function(response) {
            console.log(response);

        }
    });
}

function AmntWins() {
    $.ajax({
        type: "POST",
        url: "api/data-PO.php",
        data: {
            "method": "ACC_Amnt"
        },
       
        success: function (response) {
            let res = $.parseJSON(response)

            $('#AmntAll').text( Math.abs(res.data[0].TotalAmntWins).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');
            $('#AllPalm').text( Math.abs(res.data[0].WeiPalmWin).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
            $('#PricePerKg').text( Math.abs(res.data[0].PricePerKg).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');

            $('#webAmnt').text( Math.abs(res.data[0].TotalAmntWeb).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');
            $('#CashAmnt').text( Math.abs(res.data[0].CashWeb).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');
            $('#CreditAmnt').text( Math.abs(res.data[0].CreditWeb).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' บาท');

        }
    });
  }

