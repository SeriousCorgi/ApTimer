$(document).ready(function () {
    console.log("loaded index.js");

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
                    error_y: {array: err_cl, visible: true, color: 'black'},
                    mode: 'lines+markers',
                    line: {color: 'black', dash: 'dash', width: 2},
                    showlegend: false,
                };
                var lineF = {
                    x: x,
                    y: y_f,
                    xaxis: 'x2',
                    yaxis: 'y2',
                    error_y: {array: err_f, visible: true, color: 'black'},
                    mode: 'lines+markers',
                    line: {color: 'black', dash: 'dash', width: 2},
                    showlegend: false,
                };
                var lineOH = {
                    x: x,
                    y: y_oh,
                    xaxis: 'x3',
                    yaxis: 'y3',
                    error_y: {array: err_oh, visible: true, color: 'black'},
                    mode: 'lines+markers',
                    line: {color: 'black', dash: 'dash', width: 2},
                    showlegend: false,
                };
                var layout = {
                    grid: {rows: 1, columns: 3, pattern: 'independent'},
                    xaxis: {dtick: 2},
                    xaxis2: {dtick: 2},
                    xaxis3: {dtick: 2},
                    yaxis: {dtick: 0.01},
                    yaxis2: {dtick: 0.05},
                    yaxis3: {dtick: 0.05},
                };

                Plotly.newPlot('plot', [lineCl, lineF, lineOH], layout);
            },
            error: function (data) {
                console.log("error");

            }
        });
    });

    $(".button-cal").click(function () {
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
    });

    $(".button-plot").click(function () {
        $xcl_ini = $(".plot-input #xcl_ini").val();
        $xf_ini = $(".plot-input #xf_ini").val();
        $xoh_ini = $(".plot-input #xoh_ini").val();
        $xcl_left = $(".plot-input #xcl_left").val();
        $xf_left = $(".plot-input #xf_left").val();
        $xoh_left = $(".plot-input #xoh_left").val();
        $xcl_right = $(".plot-input #xcl_right").val();
        $xf_right = $(".plot-input #xf_right").val();
        $xoh_right = $(".plot-input #xoh_right").val();
    });
});