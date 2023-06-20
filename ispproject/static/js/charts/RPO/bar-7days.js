$(document).ready(function () {

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('1a2a4978380ced71212c', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
        bar_chart();

    });


    bar_chart();
});


function bar_chart() {

    $.ajax({
        type: "POST",
        url: "api/data-palm.php",
        data: {
            "method": "7days"
        },

        success: function (response) {
            let res = $.parseJSON(response);
            let date = [];
            let total = [];


            for (let i in res.data) {
                date.push(res.data[i].DocuDate);
                total.push(res.data[i].Total);

            }

            let chartdata = {
                labels: date,
                datasets: [{
                    label: 'แผนภูมิเเสดงปริมาณผลปาล์ม',
                    backgroundColor: [
                        'rgba(123, 36, 28,1)',
                        'rgba(99, 57, 116 , 1)',
                        'rgba(33, 97, 140 ,1)',
                        'rgba(17, 120, 100, 1)',
                        'rgba(25, 111, 61 , 1)',
                        'rgba(135, 54, 0, 1)',
                        'rgba(255, 159, 64, 1)',


                    ],
                    borderColor: [
                        'rgba(123, 36, 28,0.2)',
                        'rgba(99, 57, 116 , 0.2)',
                        'rgba(33, 97, 140 ,0.2)',
                        'rgba(17, 120, 100, 0.2)',
                        'rgba(25, 111, 61 , 0.2)',
                        'rgba(135, 54, 0, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],

                    hoverBackgroundColor: '#CCCCCC',
                    hoverBorderColor: '#666666',
                    data: total

                }]
            };


            let barTarget = $('#BarChart');

            let barGraph = new Chart(barTarget, {
                type: 'bar',
                data: chartdata,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                if (parseInt(value) >= 1000) {
                                    return Math.abs(value.replace(/[^0-9\.]+/g, "")).toLocaleString('th-TH', { maximumFractionDigits: 2 }) + ' Kg.';
                                } else {
                                    return value;
                                }
                            }
                        } // end callbacks:
                    }, //end tooltips                
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    if (parseInt(value) >= 1000) {
                                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    } else {
                                        return value;
                                    }
                                }
                            }
                        }]
                    }
                }



            });
        }
    });

}