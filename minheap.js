function minHeap()
{
    var self = this;
    this.vector = [];
    
    this.push = function(key,obj)
    {
        var c = self.vector.length;
        self.vector.push({ key: key, obj: obj});
        
        while(c != 0)
        {
            if(self.vector[c].key < self.vector[Math.floor(c / 2)].key)
            {
                var tmp = self.vector[Math.floor(c / 2)];
                self.vector[Math.floor(c / 2)] = self.vector[c].key;
                self.vector[c].key = tmp;
                c = Math.floor(c / 2);
            } else {
                break;   
            }
        }
    };
    
    this.pop = function()
    {
        if(self.vector.length == 0)
        {
            return;
        } else if(self.vector.length == 1) {
            self.vector.pop();
            return;
        } else {
            self.vector[0] = self.vector[self.vector.length - 1];
            self.vector.pop();
            
            var c = 0;
            
            while(c * 2 + 1 < self.vector.length)
            {
                if(c * 2 + 2 < self.vector.length)
                {
                    if(self.vector[c].key > self.vector[c * 2 + 1].key || self.vector[c].key > self.vector[c * 2 + 2].key)
                    {
                        if(self.vector[c * 2 + 1].key < self.vector[c * 2 + 2].key)
                        {
                            var tmp = self.vector[c];
                            self.vector[c] = self.vector[c * 2 + 1];
                            self.vector[c * 2 + 1] = tmp;
                        } else {
                            var tmp = self.vector[c];
                            self.vector[c] = self.vector[c * 2 + 2];
                            self.vector[c * 2 + 2] = tmp;
                        }
                    } else {
                        break;
                    }
                } else {
                    if(self.vector[c].key > self.vector[c * 2 + 1])
                    {
                        var tmp = self.vector[c];
                        self.vector[c] = self.vector[c * 2 + 1];
                        self.vector[c * 2 + 1] = tmp;
                        c = c * 2 + 1;
                    } else {
                        break;   
                    }
                }
            }
        }
    };
    
    this.top = function()
    {
        return self.vector[0];
    };
    
    this.size = function()
    {
        return self.vector.length;   
    }
}