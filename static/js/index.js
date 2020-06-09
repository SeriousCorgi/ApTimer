$(document).ready(function () {
    console.log("loaded index.js");
    let uploaded = false;

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
                var y_cl = data['y_cl'];
                var y_f = data['y_f'];
                var y_oh = data['y_oh'];
                var err_cl = data['err_cl'];
                var err_f = data['err_f'];
                var err_oh = data['err_oh'];

                var lineCl = {
                    x: x,
                    y: y_cl,
                    error_y: { array: err_cl, visible: true, color: 'black' },
                    mode: 'lines+markers',
                    line: { color: 'black', dash: 'dash', width: 2 },
                    showlegend: false,
                };
                var lineF = {
                    x: x,
                    y: y_f,
                    xaxis: 'x2',
                    yaxis: 'y2',
                    error_y: { array: err_f, visible: true, color: 'black' },
                    mode: 'lines+markers',
                    line: { color: 'black', dash: 'dash', width: 2 },
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
                    showlegend: false,
                };
                var layout = {
                    grid: { rows: 1, columns: 3, pattern: 'independent' },
                    xaxis: { dtick: 2, title: { text: "Distance (µm)" } },
                    xaxis2: { dtick: 2, title: { text: "Distance (µm)" } },
                    xaxis3: { dtick: 2, title: { text: "Distance (µm)" } },
                    yaxis: { dtick: 0.01, title: { text: "X<sub>Cl</sub>" } },
                    yaxis2: { dtick: 0.05, title: { text: "X<sub>F</sub>" } },
                    yaxis3: { dtick: 0.05, title: { text: "X<sub>OH</sub>" } },
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
            $(".calculation-result").empty()
            $temp = $(".diffusivity-cal #temp").val();
            $tilt = $(".diffusivity-cal #tilt").val();

            let url = "http://localhost:8000/api/diff"
            $.get(url, { temp: $temp, tilt: $tilt }, function (data, status) {
                console.log(status);
                if (status == "success") {
                    let diff = data['diffusivity'];
                    let dcl = diff['D(CL)'];
                    let df = diff['D(F)'];
                    let doh = diff['D(OH)'];

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

    $(".button-plot").click(function () {
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
            }
            $.get(url, req_data, function (data, status) {
                console.log(status);
                if (status == "success") { }
            })
        } else {
            alert("Please upload excel file");
        }
    });
});