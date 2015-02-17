/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function(){
    function response(){
        
        if(this.readyState == this.DONE){
            if(this.status == 200){                                
                var jsn = JSON.parse(this.responseText);                
                gallery.init('gallery', jsn, 'Taken at the Intel Conference in ');                
                return;
            }else{                
                console.log(this.status);
            }
        }
    }   
    
    function error(e){
        console.log(e);
    }
    var rq = new XMLHttpRequest();
   
    rq.onreadystatechange = response;
    
    rq.open('GET', '../server/gallery_json.js');
    rq.setRequestHeader('Content-Type', 'application/json');   
    rq.addEventListener('error', error, false);    
    rq.send();    
    
};