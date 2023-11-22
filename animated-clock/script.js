const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const lineColor = document.getElementById('line-color');
const borderColor = document.getElementById('border-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');


function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');

    // setup canvas
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250);
    ctx.rotate(-Math.PI / 2);


    // set default styles
    ctx.strokeStyle = '#0000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // draw clock border
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColor.value;
    ctx.fillStyle = faceColor.value;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // draw hour lines
    ctx.save();
    ctx.strokeStyle = lineColor.value;
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // draw minute lines
    ctx.save();
    ctx.strokeStyle = lineColor.value;
    ctx.lineWidth = 4;
    for (let i = 0; i < 60; i++) {
        if (i % 5 != 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    // get current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // draw hour hand
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // draw minute hand
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // draw second hand
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = secondHandColor.value;
    ctx.fillStyle = secondHandColor.value;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore();

    requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
});