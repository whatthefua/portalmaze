function rect(x,y,w,h,color)
{
    var self = this;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.alpha = 1;
    this.dAlpha = 0;
    
    this.draw = function()
    {
        window.ctx.fillStyle = self.color;
        window.ctx.shadowBlur = 0;
        window.ctx.globalAlpha = self.alpha;
        window.ctx.fillRect(self.x,self.y,self.w,self.h);
        window.ctx.globalAlpha = 1;
        
        this.alpha += this.dAlpha;
        
        if(this.alpha >= 1)
        {
            this.alpha = 1;
            this.dAlpha = 0;
        } else if(this.alpha <= 0) {
            this.alpha = 0;
            this.dAlpha = 0;
        }
    };
}