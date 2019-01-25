class Signature {
  constructor(){
    this.canvas = $('#signature')[0];
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
    const _this = this;
    $('#signature').on('mousedown', (e) => {
      _this.isDrawing = true;
      [_this.lastX, _this.lastY] = [e.offsetX, e.offsetY];
    });
    $('#signature').on('mousemove', (e) => {
      _this.draw(e);
    });
    $('#signature').on('mouseup', () => {
      _this.isDrawing = false;
    });
    $('#signature').on('mouseout', () => {
      _this.isDrawing = false;
    });
  }

  draw(e) {
    const _this = this;
    if (!_this.isDrawing) return;
    _this.hasSigned = true;
    _this.ctx.beginPath();
    _this.ctx.moveTo(_this.lastX, _this.lastY);
    _this.ctx.lineTo(e.offsetX, e.offsetY);
    _this.ctx.stroke();
    [_this.lastX, _this.lastY] = [e.offsetX, e.offsetY];
  }
}
