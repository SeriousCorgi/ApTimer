$(document).ready(function () {
    console.log("loaded index.js");

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

                $new_div = "D(CL): " + dcl + "<br>" +
                    "D(F): " + df + "<br>" +
                    "D(OH): " + doh
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

        Plotly.newPlot('plot', [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16],
            mode: 'lines+markers',
            type: 'scatter'
        }])
    });
});