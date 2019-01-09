var Signature = function () {
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

Signature.prototype = {
  mouseListener: function() {
    signature = this;
    $('#signature').on('mousedown', function(e){
      signature.isDrawing = true;
      [signature.lastX, signature.lastY] = [e.offsetX, e.offsetY];
    });
    $('#signature').on('mousemove', function(e){
      signature.draw(e);
    });
    $('#signature').on('mouseup', () => {
      signature.isDrawing = false;
    });
    $('#signature').on('mouseout', () => {
      signature.isDrawing = false;
    });
  },

  draw: function(e) {
    signature = this;
    if (!signature.isDrawing) return;
    signature.hasSigned = true;
    signature.ctx.beginPath();
    signature.ctx.moveTo(signature.lastX, signature.lastY);
    signature.ctx.lineTo(e.offsetX, e.offsetY);
    signature.ctx.stroke();
    [signature.lastX, signature.lastY] = [e.offsetX, e.offsetY];
  }
}

var signaturePad = new Signature();