$(document).ready(function () {
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('1a2a4978380ced71212c', {
                cluster: 'ap1'
            });
        
            var channel = pusher.subscribe('my-channel');
            channel.bind('my-event', function(data) {
                showGraph();
        
            });


            showGraph();
    
});


function showGraph() {

    $.ajax({
        type: "POST",
        url: "api/data-palm.php",
        data: {
            "method":"Today"
        },
        
        success: function (data) {
           let res =$.parseJSON(data);
            let type = [];
            let weight = [];
            let per = [];

            for (let i in res) {
                type.push(res[i].Type);
                weight.push(res[i].Val);
                per.push(res[i].PerCent);
            }

            let mp = res[1].Val;
            let fp = res[0].Val;
            let ap = mp + fp;


            $('#MPalm').text(Number(mp).toLocaleString('th') + ' กิโลกรัม');
            $('#FPalm').text(Number(fp).toLocaleString('th') + ' กิโลกรัม');
            $('#AllPalm').text(Number(ap).toLocaleString('th') + ' กิโลกรัม');
            let chartdata = {
                labels: type,
                datasets: [{
                    label: 'ปริมาณผลปาล์ม',
                    backgroundColor: [
                        'rgba(54, 15, 7 )',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(140, 42, 21)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    hoverBackgroundColor: '#CCCCCC',
                    hoverBorderColor: '#666666',
                    data: weight

                }]
            };




            

            let doughnutTarget = $('#pie_chart');
            let doughnutGraph = new Chart(doughnutTarget, {
                type: 'pie',
                data: chartdata,
                options: {
                    tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            try {
                              let label = ' ' + data.labels[tooltipItem.index] || '';
                    
                              if (label) {
                                label += ': ';
                              }
                    
                              const sum = data.datasets[0].data.reduce((accumulator, curValue) => {
                                return accumulator + curValue;
                              });
                              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    
                              label += Number((value / sum) * 100).toFixed(2) + '%';
                              return label;
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        }
                      }
                  }
            });
        }
    });


}