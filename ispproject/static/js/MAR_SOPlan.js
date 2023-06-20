$(document).ready(function() {

    $('#NumberCar').on('change', function() {

        let opt = $(this).val();
        $.ajax({
            type: "POST",
            url: "api/data-cars.php",
            data: {
                "NumberCar": opt
            },
            success: function(response) {
                console.log(response);
                $("#DriverNames option").remove();
                if (response == "") {

                    return;
                }

                let json = $.parseJSON(response);


                $.each(json, function(index, column) {

                    $('<option value="' + column.DriverName + '" ></option>').appendTo("#DriverNames");



                });
            }
        });
    });


    $.getJSON("api/data-cars.php", function(json) {
        $.each(json, function(index, column) {
            $('<option value="' + column.DriverName + '" ></option>').appendTo("#DriverNames");
            $('<option value="' + column.NumberCar + '" ></option>').appendTo("#NumberCars");

        });
    });


    let countNumCar = 1;
    $('#addDriver').click(function(e) {
        e.preventDefault();
        let i = 0;
        let num = $('#NumberCar').val();
        let name = $('#DriverName').val();
        let div = $(this).parent('div');
        $(' <div class=" form-inline">' +
            ' <input type="text" id="NumberCar" value="' + num + '" aria-label="ทะเบียนผู้ขับ"placeholder="ทะเบียนผู้ขับ" class="form-control mt-1">' +
            ' <input type="text" id="DriverName" value="' + name + '" aria-label="ชื่อชื่อผู้ขับ"placeholder="ชื่อชื่อผู้ขับ" class="ml-1 form-control mt-1">' +
            ' <button class="del-Driver ml-1 mt-1 btn text-danger "><i class="fa fa-user-minus"></i></button>' +
            ' </div>'
        ).appendTo(div);

        //let div = $(this).parent('div');

        // $(div).prepend(' <div class=" form-inline mb-1">'+
        //                 ' <input type="text" id="NumberCar" value="'+num+'"list="NumberCars" aria-label="ทะเบียนผู้ขับ"placeholder="ทะเบียนผู้ขับ" class="form-control mb-1">'+
        //                 ' <input type="text" id="DriverName"value="'+name+'" list="DriverNames" aria-label="ชื่อชื่อผู้ขับ"placeholder="ชื่อชื่อผู้ขับ" class="ml-1 form-control mb-1">'+
        //                 ' <button class="del-Driver ml-1 mt-1 btn text-danger "><i class="fa fa-user-minus"></i></button>'+
        //                 ' </div>');

        $('#NumberCar').val(null).focus();
        $('#DriverName').val(null);
        $('#divDriver').each(function() {

            countNumCar = $('input#NumberCar', $(this)).length;
            console.log(countNumCar);
        });

        let el = $('#DriverNames option');
        el.empty();

    });





    $(document).on("click", '.del-Driver', function(e) {
        $(this).parent('div').remove();
    });

    $(document).on("click", '.detail_plan', function(e) {

        let sopid = $(this).data('id');
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "api/data-soplan.php",
            data: { "SOPID": sopid },
            success: function(response) {
                let res = $.parseJSON(response);
                //console.log(res); 
                get_DetailSOPlan(res.data);
            },
            error: function(response) {

            }
        });

    });

    $('#AddPlanModal').on('shown.bs.modal', function() {
        let today = new Date();
        let dd = today.getDate() + 1;
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = `${yyyy}-${mm}-${dd}`;
        $("#SOPDate").val(today);

        $('#SOPDate').datepicker({
            clearBtn: true
        });

    })


    $("#Form_AddPlan").submit(function(event) {
        event.preventDefault();
        //  console.log($('#Form_AddPlan input').val());
        $('#SaveAddPlan').prop("disabled", true);
        let SOPDate = $('#SOPDate').val();
        let GoodID = $('#GoodID').val();
        let GoodName = $('#GoodName').val();


        let CustID = $('#CustID').val();
        let Recipient = $('#Recipient').val();

        let AmntLoad = Number($('#AmntLoad').val().replace(/[^0-9\.]+/g, ""));

        let Remarks = $('#Remarks').val();

        let arrDriver = $("input[id^='DriverName']").map(function(idx, ele) {
            return $(ele).val();
        }).get();
        let arrNumberCar = $("input[id^='NumberCar']").map(function(idx, ele) {
            return $(ele).val();
        }).get();
        //   console.log(arrDriver);
        //   console.log(arrNumberCar);

        $.ajax({
            type: "POST",
            url: "api/SOPlan_insert.php",
            data: {
                "SOPDate": SOPDate,
                "GoodID": GoodID,
                "GoodName": GoodName,
                "arrNumberCar": arrNumberCar,
                "arrDriver": arrDriver,
                "CustID": CustID,
                "Recipient": Recipient,
                "AmntLoad": AmntLoad,
                "Remarks": Remarks
            },
            success: function(res) {
                let data = $.parseJSON(res);

                //console.log(data.status);

                if (data.status == 200) {
                    alrt_success();
                    $('#Form_AddPlan').trigger("reset");
                    $('#AddPlanModal').modal('toggle');
                    $('#SaveAddPlan').prop("disabled", false);
                } else {
                    alrt_error(data.data);
                    $('#SaveAddPlan').prop("disabled", false);

                }



            },
            error: function(res) {
                $('#SaveAddPlan').prop("disabled", false);
                console.log(res.statusText);
                alrt_error(res.statusText);
            }
        });

        return true;
    });


    $("#Form_DetailPlan").submit(function(event) {
        event.preventDefault();
        $('#btn_UpdatePlan').prop("disabled", true);
        let method = "MAR";
        let SOPID = $('#DT_SOPID').val();
        let SOPDate = $('#DT_SOPDate').val();
        let GoodID = $('#DT_GoodID').val();
        let GoodName = $('#DT_GoodName').val();
        let NumberCar = $('#DT_NumberCar').val();
        let DriverName = $('#DT_DriverName').val();
        let CustID = $('#DT_CustID').val();
        let Recipient = $('#DT_Recipient').val();
        let AmntLoad = Number($('#DT_AmntLoad').val().replace(/[^0-9\.]+/g, ""));
        let Remarks = $('#DT_Remarks').val();


        $.ajax({
            type: "POST",
            url: "api/SOPlan_update.php",
            data: {
                "method": method,
                "SOPID": SOPID,
                "SOPDate": SOPDate,
                "GoodID": GoodID,
                "GoodName": GoodName,
                "NumberCar": NumberCar,
                "DriverName": DriverName,
                "CustID": CustID,
                "Recipient": Recipient,
                "AmntLoad": AmntLoad,
                "Remarks": Remarks
            },
            success: function(res) {
                let data = $.parseJSON(res);
                // console.log(data.data);

                if (data.status == 200) {
                    alrt_success();
                    $('#Form_DetailPlan').trigger("reset");
                    $('#DetailPlanModal').modal('toggle');
                    $('#btn_UpdatePlan').prop("disabled", false);
                } else {
                    alrt_error(data.data);
                    $('#btn_UpdatePlan').prop("disabled", false);
                }
            },
            error: function(res) {
                $('#btn_UpdatePlan').prop("disabled", false);
                console.log(res.statusText);
                alrt_error(res.statusText);
            }
        });

        return true;
    });


    $('#AmntLoad,#DT_AmntLoad').blur(function(e) {
        this.type = '';
        this.lastValue = this.value;
        this.value = this.value == '' ? '' : (+this.value).toLocaleString()
        $(this).val(this.value.toLocaleString() + ' กิโลกรัม');

    });
    $('#AmntLoad,#DT_AmntLoad').focus(function(e) {

        this.type = 'number';
        this.value = this.lastValue

    });






    $('#AmntLoad').on('input', function() {
        let AmntLoad = $(this).val().replace(/[^0-9\.]+/g, "");
        if (AmntLoad <= 0) {
            $(this).addClass('is-invalid');
            $('#SaveAddPlan').prop("disabled", true);


        } else {
            $(this).removeClass('is-invalid');
            $('#SaveAddPlan').prop("disabled", false);

        }
        //console.log(AmntLoad);
    });

    $.getJSON("api/data-goods.php", function(json) {
        $.each(json, function(index, column) {
            $('<option data-id="' + column.GoodID + '" value="' + column.GoodCode + '" ></option>').appendTo("#GoodCodes");
            $('<option data-id="' + column.GoodID + '" value="' + column.GoodName1 + '" ></option>').appendTo("#GoodNames");
            $('<option data-id="' + column.GoodID + '" value="' + column.GoodCode + '" ></option>').appendTo("#DT_GoodCodes");
            $('<option data-id="' + column.GoodID + '" value="' + column.GoodName1 + '" ></option>').appendTo("#DT_GoodNames");
        });
    });
    $.getJSON("api/data-cust.php", function(json) {
        $.each(json, function(index, column) {
            $('<option data-id="' + column.CustID + '" value="' + column.CustCode + '" ></option>').appendTo("#CustCodes");
            $('<option data-id="' + column.CustID + '" value="' + column.CustName + '" ></option>').appendTo("#CustNames");
            $('<option data-id="' + column.CustID + '" value="' + column.CustCode + '" ></option>').appendTo("#DT_CustCodes");
            $('<option data-id="' + column.CustID + '" value="' + column.CustName + '" ></option>').appendTo("#DT_CustNames");
        });
    });







    $('#GoodCode').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let GoodName = $("#GoodNames option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#GoodName').val(GoodName);
        $('#GoodID').val(dataID);
    });
    $('#GoodName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let GoodID = $("#GoodCodes option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#GoodCode').val(GoodID);
        $('#GoodID').val(dataID);
    });
    $('#CustName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let CustCode = $("#CustCodes option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#CustCode').val(CustCode);
        $('#CustID').val(dataID);
    });
    $('#CustCode').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let CustName = $("#CustNames option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#CustName').val(CustName);
        $('#CustID').val(dataID);

    });

    $('#DT_GoodCode').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let GoodName = $("#DT_GoodNames option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#DT_GoodName').val(GoodName);
        $('#DT_GoodID').val(dataID);
    });
    $('#DT_GoodName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let GoodID = $("#DT_GoodCodes option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#DT_GoodCode').val(GoodID);
        $('#DT_GoodID').val(dataID);
    });
    $('#DT_CustName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let CustCode = $("#DT_CustCodes option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#DT_CustCode').val(CustCode);
        $('#DT_CustID').val(dataID);
    });
    $('#DT_CustCode').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let dataID = opt.attr('data-id');
        //console.log(getID);
        let CustName = $("#DT_CustNames option[data-id='" + dataID + "']").val();
        //console.log(name);
        $('#DT_CustName').val(CustName);
        $('#DT_CustID').val(dataID);

    });


    var tb_wei = $('#Weight').DataTable({
        "fnDrawCallback": function() {},

        ajax: "api/data-SO.php",
        columns: [
            { "data": "GoodName" },
            { "data": "Cars" },
            {
                "data": "Cars",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' คัน';
                }
            },
            { "data": "Weight" },
            {
                "data": "Weight",
                "render": function(data, type, row) {
                    return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม';
                }
            },

        ],
        columnDefs: [

            { 'targets': [1, 3], 'visible': false },
            { 'orderData': [1], 'targets': [2] },
            { 'orderData': [3], 'targets': [4] },
            { type: 'natural-nohtml', targets: [2, 4] }
        ]
    });
    ListDone(tb_wei);


});

function get_DetailSOPlan(objData) {

    $('#DetailPlanModal').on('shown.bs.modal', function() {

        $('#DT_SOPID').val(objData[0].SOPID);
        $("#DT_SOPDate").val(objData[0].SOPDate);
        $('#DT_GoodID').val(objData[0].GoodID);
        $('#DT_GoodCode').val(objData[0].GoodCode);
        $('#DT_GoodName').val(objData[0].GoodName);
        $('#DT_AmntLoad').val(Math.abs(objData[0].AmntLoad).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม');
        $('#DT_CustID').val(objData[0].CustID);
        $('#DT_CustCode').val(objData[0].CustCode);
        $('#DT_CustName').val(objData[0].CustName);
        $('#DT_NumberCar').val(objData[0].NumberCar);
        $('#DT_DriverName').val(objData[0].DriverName);
        $('#DT_Recipient').val(objData[0].Recipient);
        $('#DT_Remarks').val(objData[0].Remarks);
        $('#DT_SOPDate').datepicker({
            clearBtn: true
        });


    });

}

function ListDone(tb_wei) {


    $('#ListDoneModal').on('shown.bs.modal', function() {
        tb_wei.destroy();
        tb_wei = $('#Weight').DataTable({
            "fnDrawCallback": function() {},

            ajax: "api/data-SO.php",
            columns: [
                { "data": "GoodName" },
                { "data": "Cars" },
                {
                    "data": "Cars",
                    "render": function(data, type, row) {
                        return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' คัน';
                    }
                },
                { "data": "Weight" },
                {
                    "data": "Weight",
                    "render": function(data, type, row) {
                        return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม';
                    }
                },

            ],
            columnDefs: [

                { 'targets': [1, 3], 'visible': false },
                { 'orderData': [1], 'targets': [2] },
                { 'orderData': [3], 'targets': [4] },
                { type: 'natural-nohtml', targets: [2, 4] }
            ]
        });

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = `${yyyy}-${mm}-${dd}`;
        $("#dt_wei").val(today);

        // $('#dt_wei').datepicker({
        //     clearBtn: true
        // });

        $('#dt_wei').on('change', function() {

            tb_wei.destroy();
            let dt = $(this).val();

            tb_wei = $('#Weight').DataTable({
                ajax: {
                    url: "api/data-SO.php",
                    type: "POST",
                    data: {
                        "dt": dt
                    }
                },
                columns: [
                    { "data": "GoodName" },
                    { "data": "Cars" },
                    {
                        "data": "Cars",
                        "render": function(data, type, row) {
                            return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' คัน';
                        }
                    },
                    { "data": "Weight" },
                    {
                        "data": "Weight",
                        "render": function(data, type, row) {
                            return Math.abs(data).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' กิโลกรัม';
                        }
                    },

                ],
                columnDefs: [

                    { 'targets': [1, 3], 'visible': false },
                    { 'orderData': [1], 'targets': [2] },
                    { 'orderData': [3], 'targets': [4] },
                    { type: 'natural-nohtml', targets: [1, 3] }
                ]

            });



        });




    });


}