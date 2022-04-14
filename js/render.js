function render(obj) {
    var canvas = document.getElementById('board');
    var context = canvas.getContext('2d', { antialias: true });

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    var pathType = { arc: 0, circle: 1, ellipse: 2, rectangle: 3, line: 4, pen: 5 };
    var renderType = { fill: 0, stroke: 1 };

    for (var i = 0; i < obj.length; i++) {

        if (obj[i].renderType == renderType.fill) {
            context.fillStyle = obj[i].fillColor;
        }
        else {
            context.strokeStyle = obj[i].strokeColor;
        }

        context.moveTo(obj[i].points[0].x, obj[i].points[0].y);
        if (obj[i].pathType == pathType.arc) {
            if (obj[i].points.length > 1) {
                context.beginPath();
                context.moveTo(obj[i].points[0].x, obj[i].points[0].y);
                context.arcTo(obj[i].points[1].x, obj[i].points[1].y, obj[i].points[2].x, obj[i].points[2].y, obj[i].radius);

                if (obj[i].renderType == renderType.fill) {
                    context.fill();
                }
                else {
                    context.stroke();
                }

                //if (obj[i].isActive) {
                //    let radius = Math.abs(obj[i].points[2].y - obj[i].points[0].y);
                //    let bound_x = 0;
                //    let bound_y = obj[i].points[0].y;

                //    if (Math.abs(obj[i].points[0].x - obj[i].points[2].x) < radius) {
                //        if (obj[i].points[2].x > obj[i].points[0].x) {
                //            bound_x = obj[i].points[2].x - radius;
                //        }
                //        else {
                //            bound_x = obj[i].points[2].x + radius;
                //        }
                //    }
                //    else {
                //        bound_x = obj[i].points[0].x;
                //    }

                //context.strokeStyle = '#bc2ef7';

                //var w = Math.abs(bound_x - obj[i].points[2].x);
                //var h = Math.abs(bound_y - obj[i].points[2].y);

                //context.strokeRect((bound_x > obj[i].points[2].x ? obj[i].points[2].x : bound_x) - 15,
                //    (bound_y > obj[i].points[2].y ? obj[i].points[2].y : bound_y) - 15,
                //    w + 30, h + 30);

                //context.strokeStyle = obj[i].strokeColor;

                //bound_x = bound_x > obj[i].points[2].x ? obj[i].points[2].x : bound_x - 15;
                //bound_y = bound_y > obj[i].points[2].y ? obj[i].points[2].y : bound_y - 15;

                //w += 30;
                //h += 30;

                //boundary(context, bound_x, bound_y, w, h);
                //}
            }
        }
        else if (obj[i].pathType == pathType.ellipse) {
            let x = obj[i].points[0].x;
            let y = obj[i].points[0].y;
            let radiusX = obj[i].radiusX;
            let radiusY = obj[i].radiusY;
            let rotation = obj[i].rotation;
            let startAngle = obj[i].startAngle;
            let endAngle = obj[i].endAngle;
            let antiClockWise = obj[i].antiClockWise;

            context.moveTo(x, y);
            context.beginPath();

            context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockWise);

            if (obj[i].renderType == renderType.fill) {
                context.fill();
            }
            else {
                context.stroke();
            }

            //if (obj[i].isActive) {
            //    let bound_x = x>obj[i].points[1].x?obj[i].points[1]+Math.abs(obj[i].points[1].x-x)*2:
            //    let bound_y = y - radiusY;

            //    context.beginPath();
            //    //context.moveTo(bound_x, bound_y);
            //    context.arc(bound_x, bound_y, 5, 0, Math.PI * 2);
            //    context.stroke();
            //}
        }

        else if (obj[i].pathType == pathType.rectangle) {
            if (obj[i].points.length < 2) {
                return true;
            }
            let x = obj[i].points[0].x;
            let y = obj[i].points[0].y;

            if (x > obj[i].points[1].x) {
                x = obj[i].points[1].x;
            }

            if (y > obj[i].points[1].y) {
                y = obj[i].points[1].y;
            }

            let width = obj[i].width;
            let height = obj[i].height;

            if (obj[i].renderType == renderType.fill) {
                context.fillRect(x, y, width, height);
            }
            else {
                context.strokeRect(x, y, width, height);
            }
        }
        else if (obj[i].pathType == pathType.line) {
            let x = obj[i].points[0].x;
            let y = obj[i].points[0].y;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(obj[i].points[1].x, obj[i].points[1].y);

            context.stroke();
        }
        else if (obj[i].pathType == pathType.pen) {
            var p = obj[i].points;
            if (p != null && p.length > 2) {
                context.beginPath();
                context.moveTo(p[0].x, p[0].y);
                for (var j = 1; j < p.length; j++) {
                    context.lineTo(p[j].x, p[j].y);
                }
                if (obj[i].renderType == renderType.fill) {
                    context.fill();
                }
                else {
                    context.stroke();
                }
            }
        }
        else if (obj[i].pathType == pathType.circle) {
            context.beginPath();
            //context.moveTo(obj[i].points[0].x, obj[i].points[0].y);
            context.arc(obj[i].points[0].x, obj[i].points[0].y, obj[i].radius, 0, Math.PI * 2);
            if (obj[i].renderType == renderType.fill) {
                context.fill();
            }
            else {
                context.stroke();
            }
        }
    }

    for (var i = 0; i < obj.length; i++) {
        if (obj[i].isActive) {
            boundary(context, obj[i].boundaryX, obj[i].boundaryY, obj[i].boundaryWidth, obj[i].boundaryHeight);
        }
    }
}

function boundary(context, x, y, width, height) {
    let w = 5;
    let strokeStyle = context.strokeStyle;
    context.strokeStyle = '#bc2ef7';
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, w, 0, Math.PI * 2);
    context.moveTo(x + width, y);
    context.arc(x + width, y, w, 0, Math.PI * 2);
    context.moveTo(x, y + height);
    context.arc(x, y + height, w, 0, Math.PI * 2);
    context.moveTo(x + width, y + height);
    context.arc(x + width, y + height, w, 0, Math.PI * 2);
    context.moveTo(x + w, y);
    context.lineTo(x + width - w, y);
    context.moveTo(x + width, y + w);
    context.lineTo(x + width, y + height - w);
    context.moveTo(x + width - w, y + height);
    context.lineTo(x + w, y + height);
    context.moveTo(x, y + height - w);
    context.lineTo(x, y + w);
    context.stroke();
    context.strokeStyle = strokeStyle;
}
var DotNetReference = null;

function setReference(obj) {
    DotNetReference = obj;
}

window.addEventListener('resize', function () {
    DotNetReference.invokeMethod("Initial");
});