function text(text,x,y,font,color,glowColor,glowSize,align)
{
    var self = this;
    
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.glowColor = glowColor;
    this.glowSize = glowSize;
    this.align = align;
    this.alpha = 1;
    this.dAlpha = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.xAcc = 0;
    this.yAcc = 0;
    this.xStopAcc = 0;
    this.yStopAcc = 0;
    
    this.textWidth = function()
    {
        window.ctx.fillStyle = self.color;
        window.ctx.font = self.font;
        window.ctx.shadowColor = self.glowColor;
        window.ctx.shadowOffsetX = 0;
        window.ctx.shadowOffsetY = 0;
        window.ctx.shadowBlur = self.glowSize;
        
        return window.ctx.measureText(self.text).width;
    }
    
    this.draw = function()
    {
        window.ctx.fillStyle = self.color;
        window.ctx.font = self.font;
        window.ctx.shadowColor = self.glowColor;
        window.ctx.shadowOffsetX = 0;
        window.ctx.shadowOffsetY = 0;
        window.ctx.shadowBlur = self.glowSize;
        
        window.ctx.globalAlpha = self.alpha;
        
        if(self.align == "left")
        {
            window.ctx.fillText(self.text,self.x,self.y);
        } else if(self.align == "center") {
            window.ctx.fillText(self.text,self.x - window.ctx.measureText(self.text).width / 2,self.y);
        } else if(self.align == "right") {
            window.ctx.fillText(self.text,self.x - window.ctx.measureText(self.text).width,self.y);
        }
        
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
        
        self.xVel += self.xAcc;
        self.yVel += self.yAcc;
        
        if(self.xAcc > 0)
        {
            if(self.xVel > self.xStopAcc)
            {
                self.xVel = self.xStopAcc;
                self.xAcc = 0;
            }
        } else {
            if(self.xVel < self.xStopAcc)
            {
                self.xVel = self.xStopAcc;
                self.xAcc = 0;
            }
        }
        
        if(self.yAcc > 0)
        {
            if(self.yVel > self.yStopAcc)
            {
                self.yVel = self.yStopAcc;
                self.yAcc = 0;
            }
        } else {
            if(self.yVel < self.yStopAcc)
            {
                self.yVel = self.yStopAcc;
                self.yAcc = 0;
            }
        }
        
        self.x += self.xVel;
        self.y += self.yVel;
    };
}