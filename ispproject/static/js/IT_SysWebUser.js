$(document).ready(function() {


    $(document).on('click', '.notify_rpo', function() {

        notify(1001, 'Line-RPO');

    });
    $(document).on('click', '.notify_rpo-so', function() {

        notify(1004, 'Line-RPO-SO');

    });
    $(document).on('click', '.notify_acc', function() {

        notify(1002, 'Line-ACC');

    });
    $(document).on('click', '.notify_store', function() {

        notify(1003, 'Line-STORE');

    });


    $('#EditUserModal').on('show.bs.modal', function() {
        $('#btn_AddUser').prop("disabled", false);
    });

    // click in dataTables
    $(document).on('click', '.edit_user', function(e) {
        e.preventDefault();
        let uid = $(this).attr('data-uid');
        $.ajax({
            type: "POST",
            url: "api/data-user.php",
            data: {
                "UID": uid
            },

            success: function(response) {
                let res = $.parseJSON(response)
                if (res.status === 200) {
                    let data = res.data;
                    $('#EditUserModal').modal('show');
                    $('#DT_UID').val(data[0].UID);
                    $('#DT_Username').val(data[0].Username);
                    $('#DT_Password').val(data[0].Password);
                    $('#DT_EmpID').val(data[0].EmpID);
                    $('#DT_EmpName').val(data[0].EmpName);
                    $('#DT_DeptID').val(data[0].DeptID);
                    $('#DT_DeptName').val(data[0].DeptName);
                    $('#DT_Remarks').val(data[0].Remarks);
                }
            }
        });

    });

    // click in dataTables
    $(document).on('click', '.del_user', function(e) {
        e.preventDefault();
        let uid = $(this).attr('data-uid');

        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ ?',
            text: "กรุณาตรวจสอบข้อมูล !",
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
                    url: "api/system_manage_user.php",
                    data: {
                        "UID": uid,
                        "act": "del_user"
                    },
                    success: function(response) {
                        let res = $.parseJSON(response)
                        if (res.status === 200) {
                            alrt_success();
                        } else {
                            alrt_error(res);
                        }
                    },
                    error: function(response) {
                        alrt_error(response);
                    }
                });

            }
        })


    });



    $.getJSON("api/data-emp.php", function(json) {
        $.each(json, function(index, column) {
            $('<option data-id="' + column.EmpID + '"data-dept="' + column.DeptID + '" value="' + column.EmpName + '" ></option>').appendTo("#EmpNames");

        });
    });
    $.getJSON("api/data-dept.php", function(json) {
        $.each(json, function(index, column) {
            $('<option data-dept="' + column.DeptID + '" value="' + column.DeptName + '" ></option>').appendTo("#DeptNames");

        });
    });

    $('#EmpName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let EmpID = opt.attr('data-id');
        let DeptID = opt.attr('data-dept');
        $('#EmpID').val(EmpID);
        $('#DeptID').val(DeptID);
        let DeptName = $(`#DeptNames option[data-dept='${DeptID}']`).val();
        $('#DeptName').val(DeptName);

    });

    $('#DeptName').on('input', function() {

        let opt = $('option[value="' + $(this).val() + '"]');
        let DeptID = opt.attr('data-dept');
        $('#DeptID').val(DeptID);

    });
    $('#DT_EmpName').on('input', function() {
        let opt = $('option[value="' + $(this).val() + '"]');
        let EmpID = opt.attr('data-id');
        let DeptID = opt.attr('data-dept');
        $('#DT_EmpID').val(EmpID);
        $('#DT_DeptID').val(DeptID);
        let DeptName = $(`#DeptNames option[data-dept='${DeptID}']`).val();
        $('#DT_DeptName').val(DeptName);

    });

    $('#DT_DeptName').on('input', function() {

        let opt = $('option[value="' + $(this).val() + '"]');
        let DeptID = opt.attr('data-dept');
        $('#DT_DeptID').val(DeptID);

    });


    $('#Form_AddUser').submit(function(e) {
        e.preventDefault();
        $('#btn_AddUser').prop("disabled", true);
        let username = $('#Username').val();
        let password = $('#Password').val();
        let empID = $('#EmpID').val();
        let deptID = $('#DeptID').val();
        let remarks = $('#Remarks').val();
        $.ajax({
            type: "POST",
            url: "api/system_manage_user.php",
            data: {
                "act": "add_user",
                "Username": username,
                "Password": password,
                "EmpID": empID,
                "DeptID": deptID,
                "Remarks": remarks
            },

            success: function(response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {
                    alrt_success();
                    $('#Form_AddUser').trigger("reset");
                    $('#AddUserModal').modal('toggle');
                    $('#btn_AddUser').prop("disabled", false);


                } else {
                    $('#btn_AddUser').prop("disabled", false);

                }

            },
            error: function(response) {
                console.log('error:' + $.parseJSON(response));
            }
        });

        return true;

    });

    $('#Form_EditUser').submit(function(e) {
        e.preventDefault();
        $('#btn_EditUser').prop("disabled", true);
        let username = $('#DT_Username').val();
        let password = $('#DT_Password').val();
        let empID = $('#DT_EmpID').val();
        let deptID = $('#DT_DeptID').val();
        let remarks = $('#DT_Remarks').val();
        let uid = $('#DT_UID').val();
        $.ajax({
            type: "POST",
            url: "api/system_manage_user.php",
            data: {
                "act": "edit_user",
                "Username": username,
                "Password": password,
                "EmpID": empID,
                "DeptID": deptID,
                "Remarks": remarks,
                "UID": uid
            },

            success: function(response) {
                let res = $.parseJSON(response);
                if (res.status === 200) {
                    alrt_success();
                    $('#Form_EditUser').trigger("reset");
                    $('#EditUserModal').modal('toggle');
                    $('#btn_EditUser').prop("disabled", false);


                } else {
                    $('#btn_EditUser').prop("disabled", false);


                }

            },
            error: function(response) {
                console.log('error:' + $.parseJSON(response));
            }
        });

        return true;

    });








});

function sweetAlert() {
    (async() => {

        const { value: formValues } = await Swal.fire({
            title: 'Multiple inputs',
            html: '<input id="swal-input1" class="swal2-input">' +
                '<input id="swal-input2" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }

    })()
}


function notify(NotifID, NotifTxt) {

    $.ajax({
        type: "POST",
        url: "api/data-notify.php",
        data: {
            "method": "SELECT",
            "NotifID": NotifID
        },

        success: function(response) {
            let res = $.parseJSON(response);
            if (res.status === 200) {
                let data = res.data;
                let token = "";

                Swal.fire({
                    title: 'Line Notify',
                    input: 'text',
                    inputLabel: `Token ${NotifTxt}`,
                    inputValue: data[0].NotifToken,

                    showCancelButton: true,
                    confirmButtonColor: '#e83e8c',
                    cancelButtonColor: '#5a5c69',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'มีบางอย่างผิดพลาด !'
                        } else {
                            token = value;
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: "POST",
                            url: "api/data-notify.php",
                            data: {
                                "method": "UPDATE",
                                "NotifID": NotifID,
                                "newToken": token
                            },

                            success: function(response) {
                                let res = $.parseJSON(response);
                                if (res.status === 200) {
                                    alrt_success();
                                } else {
                                    alrt_error(response);
                                }
                            },
                            error: function(response) {
                                alrt_error(response);
                            }
                        });
                    }
                })
            } else {
                alrt_error();
            }

        },
        error: function(response) {
            alrt_error(response);

        }
    });
}