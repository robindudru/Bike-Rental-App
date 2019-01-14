class Signature {
  constructor(){
    this.canvas = document.querySelector('#signature');
    this.ctx = this.canvas.getContext('2d');  
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#262626';
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.hasSigned = false;
    this.mouseListener();
  }

  mouseListener() {
    let that = this;
    $('#signature').on('mousedown', function(e){
      that.isDrawing = true;
      [that.lastX, that.lastY] = [e.offsetX, e.offsetY];
    });
    $('#signature').on('mousemove', function(e){
      that.draw(e);
    });
    $('#signature').on('mouseup', () => {
      that.isDrawing = false;
    });
    $('#signature').on('mouseout', () => {
      that.isDrawing = false;
    });
  }

  draw(e) {
    let that = this;
    if (!that.isDrawing) return;
    that.hasSigned = true;
    that.ctx.beginPath();
    that.ctx.moveTo(that.lastX, that.lastY);
    that.ctx.lineTo(e.offsetX, e.offsetY);
    that.ctx.stroke();
    [that.lastX, that.lastY] = [e.offsetX, e.offsetY];
  }
}

const signaturePad = new Signature();