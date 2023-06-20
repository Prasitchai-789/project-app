$(document).ready(function () {




    $('#report_modal').on('shown.bs.modal', function () {
        let today = new Date();
        let dd = today.getDate() - 1;
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = `${yyyy}-${mm}-${dd}`;
        $("#fdate,#ldate").val(today);

        $('#fdate,#ldate').datepicker({
            clearBtn: true
        });

    })


    $('#report_po').submit(function (e) {

        e.preventDefault();
        let fdate = $('#fdate').val();
        let ldate = $('#ldate').val();
        window.open('api/export_xlsx.php?fdate=' + fdate + '&&ldate=' + ldate, '_blank');
    });


    $(document).on('click', '.del_po', function () {
        let poinvid = $(this).attr('data-poinvid');
        Swal.fire({
            title: 'คุณเเน่ใจหรือไม่ ?',
            text: "ต้องการที่จะลบข้อมูล PO นี้ !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e83e8c',
            cancelButtonColor: '#5a5c69',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "api/data-PO.php",
                    data: {
                        "method": "DELETE",
                        "POInvID": poinvid
                    },
                    success: function (response) {
                        let res = $.parseJSON(response);
                        if (res.status === 200) {
                            alrt_success('ลบเเล้ว');
                        } else {
                            alrt_error();
                        }
                    },
                    error: function (response) {
                        alrt_error(response);
                    }
                });
            }
        })
    });

    //console.log(SetScaler + ' ' + SetPrice);
    $('#SetVal_PO_Modal').on('show.bs.modal', function () {
        $('#SetScaler').val(SetScaler);
        $('#SetPrice').val(SetPrice);
    });

    $('#Bill_PO_Modal').on('show.bs.modal', function () {
        $('#Scaler').val(SetScaler);
        $('#Price').val(SetPrice);
        $("#VendorCodes").children().remove();
        $("#VendorNames").children().remove();
        data_vendor();
    });


    $('#NumberCar').on('change', function () {
        let opt = $('option[value="' + $(this).val() + '"]');
        let TypeCarID = opt.attr('typecar');

        
        
        if ($(this).val() != "") {
            let TypeCar = $("#TypeCar option[value='" + TypeCarID + "']").val();
            $('#TypeCar').val(TypeCar);
        }
    });


   
    $('#VendorCode').on('input', function () {

        let opt = $('option[value="' + $(this).val() + '"]');
        let VendorCode = $(this).val();

        let dataID = opt.attr('data-id');
        let VendorName = $("#VendorNames option[data-id='" + dataID + "']").val();
        $('#VendorName').val(VendorName);

        if (VendorCode != undefined) {
         
            data_numbercars(VendorCode);
        }

    });

    $('#VendorName').on('input', function () {

        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        let VendorCode = $("#VendorCodes option[data-id='" + dataID + "']").val();
        $('#VendorCode').val(VendorCode);

        if (VendorCode != undefined) {
          

            data_numbercars(VendorCode);
        }
    });

    $('#Form_Bill_PO').submit(function (e) {

        e.preventDefault();
        $('#btn_Add_PO').prop("disabled", true);
        let BillID = $('#BillID').val();
        let Scaler = $('#Scaler').val();
        let Price = $('#Price').val();
        let VendorCode = $('#VendorCode').val();
        let TypeCar = $('#TypeCar').val();
        let NumberCar = $('#NumberCar').val();
        let IBWei = parseInt($('#IBWei').val().replace(/[^0-9\.]+/g, ""));
        let OBWei = parseInt($('#OBWei').val().replace(/[^0-9\.]+/g, ""));
        let NetWei = parseInt($('#NetWei').val().replace(/[^0-9\.]+/g, ""));
        let Grade = $('#Grade').val();
        let Impurity = $('#Impurity').val();

        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "INSERT",
                "BillID": BillID,
                "Scaler": Scaler,
                "Price": Price,
                "VendorCode": VendorCode,
                "TypeCar": TypeCar,
                "NumberCar": NumberCar,
                "IBWei": IBWei,
                "OBWei": OBWei,
                "NetWei": NetWei,
                "Grade": Grade,
                "Impurity": Impurity
            },

            success: function (response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {
                    $.ajax({
                        type: "POST",
                        url: "api/notify_rpo.php",
                        data: {
                            "method": "PO",
                            "last_id": res.last_id,
                            "NotifID": 1001
                        },

                        success: function (response) {
                            let res = JSON.parse(response);
                            console.log('send message ' + res);
                            $('#Form_Bill_PO').trigger("reset");
                            $('#Bill_PO_Modal').modal('toggle');
                            $('#btn_Add_PO').prop("disabled", false);
                            alrt_success();
                        }
                    });
                } else {
                    alrt_error(res.message);
                    $('#btn_Add_PO').prop("disabled", false);

                }
            },
            error: function (response) {
                alrt_error(response);
                $('#btn_Add_PO').prop("disabled", false);

            }
        });
    });

    $('#Form_Edit_PO').submit(function (e) {

        e.preventDefault();
        $('#btn_Edit_PO').prop("disabled", true);
        let POInvID = $('#E_POInvID').val();
        let BillID = $('#E_BillID').val();

        let Price = $('#E_Price').val();
        let VendorCode = $('#E_VendorCode').val();
        let TypeCar = $('#E_TypeCar').val();
        let NumberCar = $('#E_NumberCar').val();
        let IBWei = parseInt($('#E_IBWei').val().replace(/[^0-9\.]+/g, ""));
        let OBWei = parseInt($('#E_OBWei').val().replace(/[^0-9\.]+/g, ""));
        let NetWei = parseInt($('#E_NetWei').val().replace(/[^0-9\.]+/g, ""));
        let Grade = $('#E_Grade').val();
        let Impurity = $('#E_Impurity').val();

        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "UPDATE",
                "POInvID": POInvID,
                "BillID": BillID,
                "Price": Price,
                "VendorCode": VendorCode,
                "TypeCar": TypeCar,
                "NumberCar": NumberCar,
                "IBWei": IBWei,
                "OBWei": OBWei,
                "NetWei": NetWei,
                "Grade": Grade,
                "Impurity": Impurity
            },

            success: function (response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {

                    $('#Form_Edit_PO').trigger("reset");
                    $('#Edit_PO_Modal').modal('toggle');
                    $('#btn_Edit_PO').prop("disabled", false);
                    alrt_success();

                } else {
                    alrt_error(res.message);
                    $('#btn_Edit_PO').prop("disabled", false);

                }
            },
            error: function (response) {
                alrt_error(response);
                $('#btn_Edit_PO').prop("disabled", false);

            }
        });
    });


    $('#Form_Vendor').submit(function (e) {

        e.preventDefault();
        $('#btn_Vendor').prop("disabled", true);

        let VendorGroupID = $('#ADD_VendorGroupID').val();
        let VendorCode = $('#ADD_VendorCode').val();
        let VendorName = $('#ADD_VendorName').val();

        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "Vendor_INSERT",
                "VendorGroupID": VendorGroupID,
                "VendorCode": VendorCode,
                "VendorName": VendorName

            },

            success: function (response) {


                let res = $.parseJSON(response);
                if (res.status === 200) {
                    $('#Form_Vendor').trigger("reset");
                    $('#VendorModal').modal('toggle');
                    $('#btn_Vendor').prop("disabled", false);
                    alrt_success();

                } else {
                    alrt_error(res.message);
                    $('#btn_Vendor').prop("disabled", false);

                }
            },
            error: function (response) {
                alrt_error(response);
                $('#btn_Vendor').prop("disabled", false);

            }
        });
    });

    $(document).on('click', '.edit_po', function () {
        let poinvid = $(this).attr('data-poinvid');

        $('#Edit_PO_Modal').modal('toggle');

        $.ajax({
            type: "POST",
            url: "api/data-PO.php",
            data: {
                "method": "SELECT",
                "POInvID": poinvid
            },

            success: function (response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {
                    let data = res.data[0];
                    $('#E_POInvID').val(data.POInvID);
                    $('#E_BillID').val(data.BillID);
                    $('#E_Scaler').val(data.Scaler);
                    let Price1 = Number(data.Price1).toLocaleString('th');
                    $('#E_Price').val(Price1);
                    $('#E_TypeCar').val(data.TypeCarID);
                    $('#E_NumberCar').val(data.VendorCarID);
                    $('#E_VendorCode').val(data.VendorCode);
                    $('#E_VendorName').val(data.VendorName);
                    $('#E_IBWei').val(Number(data.GoodIB));
                    $('#E_OBWei').val(Number(data.GoodOB));
                    $('#E_NetWei').val(Number(data.GoodNet));
                    $('#E_Grade').val(data.Grade);
                    $('#E_Impurity').val(data.Impurity);

                } else {
                    alrt_error(res.message);
                }
            },
            error: function (response) {
                console.log(response);
            }
        });
    });




    EditVendor();
    EditCalWei();
    CalWei();
    sidebar();
    // data_vendor();
});

function sidebar() {
    $("#RPO_PO").addClass('active');
    $("#collapsePO").addClass('show');
    $('[data-target*="#collapseSO"]').addClass('collapsed');
    $('[href*="RPO_PO.php"]').addClass('active');
}

function data_vendor() {
    $.ajax({
        type: "POST",
        url: "api/data-vendor.php",
        data: {
            "method": "SELECT"
        },
        success: function (response) {
            let res = $.parseJSON(response);
            $.each(res.data, function (index, column) {
                $('<option data-id="' + column.VendorID + '" value="' + column.VendorName + '" ></option>').appendTo("#VendorNames");
                $('<option data-id="' + column.VendorID + '" value="' + column.VendorCode + '" ></option>').appendTo("#VendorCodes");
            });
        }
    });
}

function data_numbercars(VendorCode) {

    $("#NumberCars option").remove();
    $.ajax({
        type: "POST",
        url: "api/data-vendor.php",
        data: {
            "method": "NumberCars",
            "VendorCode": VendorCode
        },
        success: function (response) {
            let res = $.parseJSON(response);
            if (res.status === 200) {
                $.each(res.data, function (index, column) {
                    $('<option  typecar="' + column.TypeCarID + '" value="' + column.VendorCarID + '" ></option>').appendTo("#NumberCars");
                });
            } else {
                return;
            }
        }
    });


    
}

function CalWei() {

    $('#IBWei,#OBWei').blur(function (e) {
        this.type = '';
        this.lastValue = this.value;
        this.value = this.value == '' ? '' : (+this.value).toLocaleString()
        $(this).val(this.value.toLocaleString() + ' กิโลกรัม');
    });

    $('#IBWei,#OBWei').focus(function (e) {
        this.type = 'number';
        // this.value=this.lastValue;
        Math.abs($('#IBWei').val().replace(/[^0-9\.]+/g, "")) - $('#NetWei').val(Math.abs($('#OBWei').val().replace(/[^0-9\.]+/g, ""))).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม';
    });
    $('#NetWei').click(function (e) {
        let ib = Math.abs($('#IBWei').val().replace(/[^0-9\.]+/g, ""));
        let ob = Math.abs($('#OBWei').val().replace(/[^0-9\.]+/g, ""));
        let net = ib - ob;
        $(this).val(net.toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
    });


    // put ibwei ,obwei
    $('#IBWei,#OBWei').on('input', function () {
        let getIB = parseInt($('#IBWei').val().replace(/[^0-9\.]+/g, ""));
        let getOB = parseInt($('#OBWei').val().replace(/[^0-9\.]+/g, ""));
        let NetWei = getIB - getOB
        if (NetWei > 0) {
            $('#NetWei').val(Math.abs(NetWei).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
            $('#IBWei').removeClass('is-invalid');
            $('#OBWei').removeClass('is-invalid');
            $('#NetWei').removeClass('is-invalid');
        } else if (getIB < getOB) {
            $('#IBWei').addClass('is-invalid');

        } else {
            // $('#IBWei').addClass('is-invalid');
            // $('#OBWei').addClass('is-invalid');
            $('#NetWei').addClass('is-invalid');

        }

    });
}

function EditCalWei() {
    $('#E_IBWei,#E_OBWei').blur(function (e) {
        this.type = '';
        this.lastValue = this.value;
        this.value = this.value == '' ? '' : (+this.value).toLocaleString()
        $(this).val(this.value.toLocaleString() + ' กิโลกรัม');
    });

    $('#E_IBWei,#E_OBWei').focus(function (e) {
        this.type = 'number';
        // this.value=this.lastValue;
        Math.abs($('#E_IBWei').val().replace(/[^0-9\.]+/g, "")) - $('#E_NetWei').val(Math.abs($('#E_OBWei').val().replace(/[^0-9\.]+/g, ""))).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม';
    });
    $('#E_NetWei').click(function (e) {
        let ib = Math.abs($('#E_IBWei').val().replace(/[^0-9\.]+/g, ""));
        let ob = Math.abs($('#E_OBWei').val().replace(/[^0-9\.]+/g, ""));
        let net = ib - ob;
        $(this).val(net.toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
    });


    // put ibwei ,obwei
    $('#E_IBWei,#E_OBWei').on('input', function () {
        let getIB = parseInt($('#E_IBWei').val().replace(/[^0-9\.]+/g, ""));
        let getOB = parseInt($('#E_OBWei').val().replace(/[^0-9\.]+/g, ""));
        let NetWei = getIB - getOB
        if (NetWei > 0) {
            $('#E_NetWei').val(Math.abs(NetWei).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
            $('#E_IBWei').removeClass('is-invalid');
            $('#E_OBWei').removeClass('is-invalid');
            $('#E_NetWei').removeClass('is-invalid');
        } else if (getIB < getOB) {
            $('#E_IBWei').addClass('is-invalid');

        } else {
            // $('#E_IBWei').addClass('is-invalid');
            // $('#E_OBWei').addClass('is-invalid');
            $('#E_NetWei').addClass('is-invalid');

        }

    });
}

function EditVendor() {
    $('#E_VendorCode').on('input', function () {

        let opt = $('option[value="' + $(this).val() + '"]');
        let VendorCode = $(this).val();



        let dataID = opt.attr('data-id');
        let VendorName = $("#VendorNames option[data-id='" + dataID + "']").val();
        $('#E_VendorName').val(VendorName);

        if (VendorCode != undefined) {
            data_numbercars(VendorCode);
        }

    });

    $('#E_VendorName').on('input', function () {

        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        let VendorCode = $("#VendorCodes option[data-id='" + dataID + "']").val();
        $('#E_VendorCode').val(VendorCode);

        if (VendorCode != undefined) {
            data_numbercars(VendorCode);
        }


    });
}