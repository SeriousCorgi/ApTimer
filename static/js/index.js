$(document).ready(function () {
    console.log("loaded index.js");
    let uploaded = false;
    let length = 0;
    let dcl = 0;
    let df = 0;
    let doh = 0;
    let y_cl = [];
    let y_f = [];
    let y_oh = [];
    let err_cl = [];
    let err_f = [];
    let err_oh = [];

    $(".button-upload").click(function () {
        let fd = new FormData();
        $excel = $('.upload #upload-file')[0].files[0];
        fd.append('excel', $excel);

        $.ajax({
            url: 'http://localhost:8000/api/excel',
            type: 'post',
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
                var x = data['x'];
                y_cl = data['y_cl'];
                y_f = data['y_f'];
                y_oh = data['y_oh'];
                err_cl = data['err_cl'];
                err_f = data['err_f'];
                err_oh = data['err_oh'];
                length = data['length'];

                var lineCl = {
                    x: x,
                    y: y_cl,
                    error_y: { array: err_cl, visible: true, color: 'black' },
                    name: 'Natural data',
                    mode: 'lines+markers',
                    line: { color: 'black', dash: 'dash', width: 2 },
                    type: 'scatter',
                };
                var lineF = {
                    x: x,
                    y: y_f,
                    xaxis: 'x2',
                    yaxis: 'y2',
                    error_y: { array: err_f, visible: true, color: 'black' },
                    mode: 'lines+markers',
                    line: { color: 'black', dash: 'dash', width: 2 },
                    type: 'scatter',
                    showlegend: false,
                };
                var lineOH = {
                    x: x,
                    y: y_oh,
                    xaxis: 'x3',
                    yaxis: 'y3',
                    error_y: { array: err_oh, visible: true, color: 'black' },
                    mode: 'lines+markers',
                    line: { color: 'black', dash: 'dash', width: 2 },
                    type: 'scatter',
                    showlegend: false,
                };
                var layout = {
                    grid: { rows: 1, columns: 3, pattern: 'independent' },
                    plot_bgcolor: "#ccedff",
                    xaxis: { dtick: 2, title: { text: "Distance (µm)" } },
                    xaxis2: { dtick: 2, title: { text: "Distance (µm)" } },
                    xaxis3: { dtick: 2, title: { text: "Distance (µm)" } },
                    yaxis: { dtick: 0.01, title: { text: "X<sub>Cl</sub>" } },
                    yaxis2: { dtick: 0.05, title: { text: "X<sub>F</sub>" } },
                    yaxis3: { dtick: 0.05, title: { text: "X<sub>OH</sub>" } },
                    legend: {orientation: 'h', y: -0.25},
                };

                Plotly.newPlot('plot', [lineCl, lineF, lineOH], layout);
                uploaded = true;
            },
            error: function (data) {
                console.log("error");

            }
        });
    });

    $(".button-cal").click(function () {
        if (uploaded) {
            $(".calculation-result").empty();
            $temp = $(".diffusivity-cal #temp").val();
            $tilt = $(".diffusivity-cal #tilt").val();

            let url = "http://localhost:8000/api/diff";
            $.get(url, { temp: $temp, tilt: $tilt }, function (data, status) {
                console.log(status);
                if (status == "success") {
                    let diff = data['diffusivity'];
                    dcl = diff['D(CL)'];
                    df = diff['D(F)'];
                    doh = diff['D(OH)'];

                    $new_div = "D<sub>Cl</sub>: " + dcl + "<br>" +
                        "D<sub>F</sub>: " + df + "<br>" +
                        "D<sub>OH</sub>: " + doh
                    $(".calculation-result").append($new_div);
                }
            });
        } else {
            alert("Please upload excel file");
        }
    });

    $(".button-inibound").click(function () {
        if (uploaded) {
            $xcl_ini = $(".inibound #xcl_ini").val();
            $xf_ini = $(".inibound #xf_ini").val();
            $xoh_ini = $(".inibound #xoh_ini").val();
            $xcl_left = $(".inibound #xcl_left").val();
            $xf_left = $(".inibound #xf_left").val();
            $xoh_left = $(".inibound #xoh_left").val();
            $xcl_right = $(".inibound #xcl_right").val();
            $xf_right = $(".inibound #xf_right").val();
            $xoh_right = $(".inibound #xoh_right").val();

            let url = "http://localhost:8000/api/inibound"
            let req_data = {
                xcl_ini: $xcl_ini,
                xf_ini: $xf_ini,
                xoh_ini: $xoh_ini,
                xcl_left: $xcl_left,
                xf_left: $xf_left,
                xoh_left: $xoh_left,
                xcl_right: $xcl_right,
                xf_right: $xf_right,
                xoh_right: $xoh_right,
            };
            $.get(url, req_data, function (data, status) {
                console.log(status);
                console.log(data);
                if (status == "success") {
                    var inibound_cl = {
                        x: [0, 0, length, length],
                        y: data['inibound_cl'],
                        type: 'scatter',
                        name: 'Initial boundary and conditions',
                        line: {color: 'blue', dash: 'dash'},
                    };
                    var inibound_f = {
                        x: [0, 0, length, length],
                        y: data['inibound_f'],
                        type: 'scatter',
                        xaxis: 'x2',
                        yaxis: 'y2',
                        line: {color: 'blue', dash: 'dash'},
                        showlegend: false,
                    };
                    var inibound_oh = {
                        x: [0, 0, length, length],
                        y: data['inibound_oh'],
                        type: 'scatter',
                        xaxis: 'x3',
                        yaxis: 'y3',
                        line: {color: 'blue', dash: 'dash'},
                        showlegend: false,
                    };
                    Plotly.addTraces('plot', [inibound_cl, inibound_f, inibound_oh]);
                }
            })
        } else {
            alert("Please upload excel file");
        }
    });

    $(".button-distime").click(function () {
        if (uploaded) {
            $dx = $(".distime #dx").val();
            $dt = $(".distime #dt").val();
            $iteration = $(".distime #iteration").val();

            $temp = $(".diffusivity-cal #temp").val();
            $tilt = $(".diffusivity-cal #tilt").val();

            $xcl_ini = $(".inibound #xcl_ini").val();
            $xf_ini = $(".inibound #xf_ini").val();
            $xoh_ini = $(".inibound #xoh_ini").val();
            $xcl_left = $(".inibound #xcl_left").val();
            $xf_left = $(".inibound #xf_left").val();
            $xoh_left = $(".inibound #xoh_left").val();
            $xcl_right = $(".inibound #xcl_right").val();
            $xf_right = $(".inibound #xf_right").val();
            $xoh_right = $(".inibound #xoh_right").val();

            let url = "http://localhost:8000/api/distime"
            let req_data = {
                dx: $dx,
                dt: $dt,
                iteration: $iteration,
                length: length,

                temp: $temp,
                tilt: $tilt,

                dcl: dcl,
                df: df,
                doh: doh,

                xcl_ini: $xcl_ini,
                xf_ini: $xf_ini,
                xoh_ini: $xoh_ini,
                xcl_left: $xcl_left,
                xf_left: $xf_left,
                xoh_left: $xoh_left,
                xcl_right: $xcl_right,
                xf_right: $xf_right,
                xoh_right: $xoh_right,

                y_cl: JSON.stringify(y_cl),
                y_f: JSON.stringify(y_f),
                y_oh: JSON.stringify(y_oh),
                err_cl: JSON.stringify(err_cl),
                err_f: JSON.stringify(err_f),
                err_oh: JSON.stringify(err_oh),
            };
            $.get(url, req_data, function (data, status) {
                console.log(status);
                console.log(data);
                if (status == "success") {
                    let x = data['x']
                    let red_cl = {
                        x: x,
                        y: data['red_cl'],
                        type: 'scatter',
                        mode: 'lines',
                        name: 'Best-fit line',
                        line: {color: 'red'},
                    };
                    let red_f = {
                        x: x,
                        y: data['red_f'],
                        type: 'scatter',
                        mode: 'lines',
                        xaxis: 'x2',
                        yaxis: 'y2',
                        line: {color: 'red'},
                        showlegend: false,
                    };
                    let red_oh = {
                        x: x,
                        y: data['red_oh'],
                        type: 'scatter',
                        mode: 'lines',
                        xaxis: 'x3',
                        yaxis: 'y3',
                        line: {color: 'red'},
                        showlegend: false,
                    };
                    let min_cl = {
                        x: x,
                        y: data['min_Ans'],
                        type: 'scatter',
                        mode: 'lines',
                        name: 'Minimum boundary',
                        line: {color: 'green', dash: 'dash'},
                    };
                    let max_cl = {
                        x: x,
                        y: data['max_Ans'],
                        type: 'scatter',
                        mode: 'lines',
                        name: 'Maximum boundary',
                        line: {color: 'green', dash: 'dash'},
                    };
                    Plotly.addTraces('plot', [red_cl, red_f, red_oh, min_cl, max_cl]);

                    $new_div = "<b>Best-fit time: </b>" + data['best_fit_time'] + " hours (~" + data["best_day"]+ " days) <br>" +
                        "<b>Uncertainty:</b> <br>" +
                        "Plus: " + data['plus'] + "<br>" +
                        "Minus: " + data['minus']
                    $(".model-result").append($new_div);
                }
            })
        } else {
            alert("Please upload excel file");
        }
    });
});