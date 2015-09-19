function controller()
{
    var self = this;
    
    this.objects = [];
    this.eventQueue = new minHeap();
    this.frameId = 0;
    this.assets = {};
    this.assets.images = [];
    this.toAddImages = [];
    this.loadedImages = 0;
    
    this.render = function()
    {
        self.frameId++;
        window.ctx.fillStyle = "#FFFFFF";
        window.ctx.fillRect(0,0,640,480);
        
        while(self.eventQueue.size() > 0)
        {
            if(self.eventQueue.top().key <= self.frameId)
            {
                self.eventQueue.top().obj();
                self.eventQueue.pop();
            } else {
                break;
            }
        }
        
        for(var i = 0; i < self.objects.length; i++)
        {
            self.objects[i].obj.draw();
        }
    };
    
    this.addObject = function(id,obj,z)
    {
        for(var i = 0; i < self.objects.length; i++)
        {
            if(self.objects[i].id == id)
            {
                return 0;   
            }
        }
        
        if(self.objects.length == 0)
        {
            self.objects.push({ id: id, obj: obj, z: z });
        } else {
            self.objects.push({});
            
            for(i = self.objects.length - 2; i >= 0; i--)
            {
                self.objects[i + 1].id = self.objects[i].id;
                self.objects[i + 1].obj = self.objects[i].obj;
                self.objects[i + 1].z = self.objects[i].z;
                
                if(self.objects[i].z <= z)
                {
                    break;   
                }
            }
            
            self.objects[i + 1] = { id: id, obj: obj, z: z };
        }
        
        return 1;
    };
    
    this.deleteObject = function(id)
    {
        for(i = 0; i < self.objects.length; i++)
        {
            if(self.objects[i].id == id)
            {
                if(i == self.objects.length - 1)
                {
                    self.objects.pop();
                    return;
                } else {
                    self.objects[i].id = self.objects[self.objects.length - 1].id;
                    self.objects[i].obj = self.objects[self.objects.length - 1].obj;
                    self.objects[i].z = self.objects[self.objects.length - 1].z;
                    
                    self.objects.pop();
                    return;
                }
            }
        }
    };
    
    this.mouseDown = function()
    {
        for(i = 0; i < self.objects.length; i++)
        {
            if($.isFunction(self.objects[i].obj.mouseDown))
            {
                self.objects[i].obj.mouseDown();
            }
        }
    };
    
    this.mouseUp = function()
    {
        for(i = 0; i < self.objects.length; i++)
        {
            if($.isFunction(self.objects[i].obj.mouseUp))
            {
                self.objects[i].obj.mouseUp();
            }
        }
    };
    
    this.deleteAllObjects = function()
    {
        while(self.objects.length != 0)
        {
            self.objects.pop();   
        }
    };
    
    this.accessObject = function(id)
    {
        for(var i = 0; i < self.objects.length; i++)
        {
            if(self.objects[i].id == id)
            {
                return self.objects[i].obj;   
            }
        }
        
        return -1;
    };
    
    this.addImage = function(src)
    {
        self.toAddImages.push(src);
    };
    
    this.start = function(frameTime)
    {
        var loadCallBack = function()
        {
            self.loadedImages++;
            
            if(self.loadedImages == self.toAddImages.length)
            {
                setInterval(function()
                {
                    self.render();
                },frameTime);
            }
        }
        
        for(var i = 0; i < self.toAddImages.length; i++)
        {
            self.assets.images.push({});
            self.assets.images[self.assets.images.length - 1] = new Image();
            self.assets.images[self.assets.images.length - 1].onload = function()
            {
                loadCallBack();
            };
            self.assets.images[self.assets.images.length - 1].src = self.toAddImages[i];
        }
    };
}