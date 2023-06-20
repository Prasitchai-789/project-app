$(document).ready(function () {
    sidebar();


    (async () => {


        const { value: group } = await Swal.fire({

            title: 'กลุ่มปฏิบัติงาน',
            allowOutsideClick: false,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
            customClass: {
                input: 'text-center',
            },
            input: 'select',
            inputOptions: {

                A: "A",
                B: "B",

            },
            inputPlaceholder: 'เลือกกลุ่มที่คุณอยู่',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value != '') {

                        resolve()
                    } else {
                        resolve('ต้องเลือกกลุ่มก่อนนะครับ :)')
                    }
                })
            }
        })

        if (group) {

            Swal.fire(`คุณอยู่ในกลุ่ม : ${group}`)
        }



        const data = await getAmnt(group);
        setSelectWork(data);


    })();


    $('#SelectWork').change(function (e) {
        e.preventDefault();
        console.log(this.value)
        if (this.value != '') {
            getcountAmnt(this.value);
           
            setInterval(notify,1800000,this.value);
           
        }
    });

    $('#NewCount').click(function (e) {
        e.preventDefault();
        let CountAmnt = parseInt($('#CountAmnt').text());
        let CTID = $('#SelectWork').val();
        let GroupWork = $('#TextGroupWork').text();
        if (CTID != '') {

            newCount(CTID, CountAmnt, GroupWork);
        } else {
            alrt_error('กรุณาเลือกเวลา');
        }

    });

    $('#FormSetCountTrain').submit(function (e) {
        e.preventDefault();
        $('#SubmitFormSetCountTrain').prop("disabled", true);
        let CTDateStart = $('#CTDateStart').val();
        let CTDateEnd = $('#CTDateEnd').val();
        let CTTimeStart = $('#CTTimeStart').val();
        let CTTimeEnd = $('#CTTimeEnd').val();
        let CTGroupWork = $('#CTGroupWork').val();
        let CTRemarks = $('#CTRemarks').val();
        $.ajax({
            type: "POST",
            url: "api/data-CountTrain.php",
            data: {
                "action": "NewPlanCount",
                "CTDateStart": CTDateStart,
                "CTDateEnd": CTDateEnd,
                "CTTimeStart": CTTimeStart,
                "CTTimeEnd": CTTimeEnd,
                "CTGroupWork": CTGroupWork,
                "CTRemarks": CTRemarks
            },
            success: function (response) {
                // console.log(response);

                $('#FormSetCountTrain').trigger("reset");
                $('#SetCountTrain').modal('toggle');
                $('#btn_Add_PO').prop("disabled", false);
                alrt_success();
                $('#SubmitFormSetCountTrain').prop("disabled", false);

                $("#SelectWork").children().remove();
                let data = getAmnt(CTGroupWork);
                setSelectWork(data);

            }
        });

    });



    $('#DelCount').click(function (e) {
        e.preventDefault();
        let CTID = $('#SelectWork').val();

        if (CTID) {
            delCountAmnt(CTID);
        }
    });

    $('#FormSetGroupWork').submit(function (e) {
        e.preventDefault();
        $("#SelectWork").children().remove();
        let SetCTGroupWork = $('#SetCTGroupWork').val();
        let data = getAmnt(SetCTGroupWork);
        setSelectWork(data);
        alrt_success();
        $(this).trigger("reset");
        $('#SetGroupWork').modal('toggle');

    });




















});
function sidebar() {
    $("#PRO_CountTrain").addClass('active');
    $("#collapsePRO_CountTrain").addClass('show');
    $('[data-target*="#collapsePRO_CountTrain"]').removeClass('collapsed');
    $('[href*="PRO_CountTrain.php"]').addClass('active');
}

function newCount(CTID, CountAmnt, GroupWork) {
    $('#NewCount').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "api/data-CountTrain.php",
        data: {
            "action": "NewCount",
            "CTID": CTID,
            "CTList": CountAmnt,
            "CTGroupWork": GroupWork
        },
        success: function (response) {
            let res = $.parseJSON(response)
            if (res.status === 200) {

                getcountAmnt(CTID);
            } else {
                alrt_error(res.message);
                $('#NewCount').prop("disabled", false);
            }
        }
    });
}
function delCountAmnt(CTID) {
    let ctid = CTID;
    $.ajax({
        type: "POST",
        url: "api/data-CountTrain.php",
        data: {
            "action": "DelCount",
            "CTID": ctid
        },
        success: function (response) {
            let res = $.parseJSON(response);
            if (res.status === 200) {
                getcountAmnt(CTID)
            }
        }
    });
}

function getAmnt(groupWork) {

    return $.ajax({
        type: "POST",
        url: "api/data-CountTrain.php",
        async: false,
        data: {
            "action": "CheckHD",
            "groupWork": groupWork
        },
        success: function (resp) {


        },
        error: function (err) {
            console.log(err)
        }
    }).responseText;

};

function setSelectWork(data) {
    if (data) {
        let getdata = $.parseJSON(data);
        if (getdata.status === 200) {
            if (getdata.data.length > 0) {
                $(`<option value="">กรุณาเลือกเวลา</option>`).appendTo('#SelectWork');

                $.each(getdata.data, function (index, value) {
                    let dt_start = value.CTDateStart.substr(8, 9);
                    // let m_srt = value.CTDateStart.substr(5, 6);
                    // let y_srt = value.CTDateStart.substr(0, 3);
                    // let dt_end = value.CTDateEnd.substr(8, 9);
                    // let m_end = value.CTDateEnd.substr(5, 6);
                    // let y_end = value.CTDateEnd.substr(0, 3);

                    $(`<option value="${value.CTID}">${value.CTDateStart} | ${value.CTTimeStart} ถึง ${value.CTTimeEnd} </option>`).appendTo('#SelectWork');

                });

                $('#TextGroupWork').text(getdata.data[0].CTGroupWork);
            } else {
                $(`<option value="">กรุณาเพิ่มกำหนดการ</option>`).appendTo('#SelectWork');
            }

        } else {
            console.log(getdata.status);
        }
    }
}

function getcountAmnt(CTID) {

    $.ajax({
        type: "POST",
        url: "api/data-CountTrain.php",
        data: {
            "action": "getCountAmnt",
            "CTID": CTID
        },
        success: function (response) {
            let res = $.parseJSON(response);
            if (res.status === 200) {
                updateAmnt(CTID);
                $('#CountAmnt').text(res.data[0].CountAmnt);

            } else {
                return;
            }
        }
    });

}

function updateAmnt(CTID) {
    $.ajax({
        type: "POST",
        url: "api/data-CountTrain.php",
        data: {
            "action": "UpdateAmnt",
            "CTID": CTID,

        },
        success: function (response) {
            let res = $.parseJSON(response);
            if (res.status === 200) {
                $('#NewCount').prop("disabled", false);
            } else {
                return;
            }
        }
    });
}
function notify(CTID) {
   
        $.ajax({
            type: "POST",
            url: "api/notify_pro.php",
            data: {
                "action": "CountTrain",
                "CTID": CTID,

            },
            success: function (response) {
                console.log(response);
            }
        });
   
}

