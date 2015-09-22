function maze(x,y,cellsize,row,column,data,startPos,endPos)
{
    var self = this;
    
    this.x = x;
    this.y = y;
    this.cellsize = cellsize;
    this.row = row;
    this.column = column;
    this.data = data;
    this.decodedData = [];
    this.pos = startPos;
    this.endPos = endPos;
    
    this.draw = function()
    {
        window.ctx.strokeStyle = "#000000";
        window.ctx.beginPath();
        
        for(var i = 0; i <= self.row; i++)
        {
            for(var j = 0; j < self.column; j++)
            {
                if(self.decodedData[i * 2][j] == 1)
                {
                    window.ctx.moveTo(self.x + self.cellsize * j,self.y + self.cellsize * i);
                    window.ctx.lineTo(self.x + self.cellsize * (j + 1),self.y + self.cellsize * i);
                }
            }
        }
        
        for(var i = 0; i < self.row; i++)
        {
            for(var j = 0; j <= self.column; j++)
            {
                if(self.decodedData[i * 2 + 1][j] == 1)
                {
                    window.ctx.moveTo(self.x + self.cellsize * j,self.y + self.cellsize * i);
                    window.ctx.lineTo(self.x + self.cellsize * j,self.y + self.cellsize * (i + 1));
                }
            }
        }
        
        window.ctx.stroke();
        
        window.ctx.beginPath();
        window.ctx.arc(self.x + self.cellsize * self.pos.x + self.cellsize / 2,self.y + self.cellsize * self.pos.y + self.cellsize / 2,10,0,2 * Math.PI,false);
        window.ctx.fillStyle = "#FF0000";
        window.ctx.fill();
    };
    
    this.decodeData = function()
    {
        var tmp,c = 0;
        
        for(var i = 0; i <= self.row; i++)
        {
            self.decodedData[i * 2] = [];
            
            for(var j = 0; j < self.column; j += 4)
            {
                switch(self.data.charAt(c))
                {
                    case '0': tmp = 0; break;
                    case '1': tmp = 1; break;
                    case '2': tmp = 2; break;
                    case '3': tmp = 3; break;
                    case '4': tmp = 4; break;
                    case '5': tmp = 5; break;
                    case '6': tmp = 6; break;
                    case '7': tmp = 7; break;
                    case '8': tmp = 8; break;
                    case '9': tmp = 9; break;
                    case 'a': tmp = 10; break;
                    case 'b': tmp = 11; break;
                    case 'c': tmp = 12; break;
                    case 'd': tmp = 13; break;
                    case 'e': tmp = 14; break;
                    case 'f': tmp = 15; break;
                }
                
                if(tmp & 8)
                {
                    self.decodedData[i * 2][j] = 1;
                } else {
                    self.decodedData[i * 2][j] = 0;
                }
                
                if(tmp & 4)
                {
                    self.decodedData[i * 2][j + 1] = 1;
                } else {
                    self.decodedData[i * 2][j + 1] = 0;
                }
                
                if(tmp & 2)
                {
                    self.decodedData[i * 2][j + 2] = 1;
                } else {
                    self.decodedData[i * 2][j + 2] = 0;
                }
                
                if(tmp & 1)
                {
                    self.decodedData[i * 2][j + 3] = 1;
                } else {
                    self.decodedData[i * 2][j + 3] = 0;
                }
                
                c++;
            }
        }
        
        for(var i = 0; i < self.row; i++)
        {
            self.decodedData[i * 2 + 1] = [];
            
            for(var j = 0; j <= self.column; j += 4)
            {
                switch(self.data.charAt(c))
                {
                    case '0': tmp = 0; break;
                    case '1': tmp = 1; break;
                    case '2': tmp = 2; break;
                    case '3': tmp = 3; break;
                    case '4': tmp = 4; break;
                    case '5': tmp = 5; break;
                    case '6': tmp = 6; break;
                    case '7': tmp = 7; break;
                    case '8': tmp = 8; break;
                    case '9': tmp = 9; break;
                    case 'a': tmp = 10; break;
                    case 'b': tmp = 11; break;
                    case 'c': tmp = 12; break;
                    case 'd': tmp = 13; break;
                    case 'e': tmp = 14; break;
                    case 'f': tmp = 15; break;
                }
                
                if(tmp & 8)
                {
                    self.decodedData[i * 2 + 1][j] = 1;
                } else {
                    self.decodedData[i * 2 + 1][j] = 0;
                }
                
                if(tmp & 4)
                {
                    self.decodedData[i * 2 + 1][j + 1] = 1;
                } else {
                    self.decodedData[i * 2 + 1][j + 1] = 0;
                }
                
                if(tmp & 2)
                {
                    self.decodedData[i * 2 + 1][j + 2] = 1;
                } else {
                    self.decodedData[i * 2 + 1][j + 2] = 0;
                }
                
                if(tmp & 1)
                {
                    self.decodedData[i * 2 + 1][j + 3] = 1;
                } else {
                    self.decodedData[i * 2 + 1][j + 3] = 0;
                }
                
                c++;
            }
        }
        
        this.moveUp = function()
        {
            if(self.pos.y == 0)
            {
                return;   
            }
            
            if(self.decodedData[self.pos.y * 2][self.pos.x] == 1)
            {
                return;   
            }
            
            self.pos.y--;
        };
        
        this.moveDown = function()
        {
            if(self.pos.y == self.row - 1)
            {
                return;   
            }
            
            if(self.decodedData[self.pos.y * 2 + 2][self.pos.x] == 1)
            {
                return;   
            }
            
            self.pos.y++;
        };
        
        this.moveLeft = function()
        {
            if(self.pos.x == 0)
            {
                return;
            }
            
            if(self.decodedData[self.pos.y * 2 + 1][self.pos.x] == 1)
            {
                return;   
            }
            
            self.pos.x--;
        };
        
        this.moveRight = function()
        {
            if(self.pos.x == self.column - 1)
            {
                return;
            }
            
            if(self.decodedData[self.pos.y * 2 + 1][self.pos.x + 1] == 1)
            {
                return;   
            }
            
            self.pos.x++;
        };
    };
}