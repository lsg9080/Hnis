// JScript 文件

//<script  type="text/javascript" language="javascript"> 
var code="fight";
    function btnimage()
    {
       if (code=="fight") {
            document.getElementById("Image1").className="onmoveimg";
       }
      else
      {
          document.getElementById("Image1").className="onmoveimg1";
      }
    }
    function btnimage1()
    {
    if (code=="fight") {
        document.getElementById("Image1").className="imghuan";
    }
    	else
    	{
    	   document.getElementById("Image1").className="imghuan1";
    	}
    }
    
   function btnonclkleft()
   {
    
      if (document.getElementById("divtree").style.visibility=="visible")
      {
           document.getElementById("divtree").style.visibility="hidden";
           document.getElementById("divtree").style.display="none";
           document.getElementById("diviimg").className="diviimg1";
           document.getElementById("divimg").className="divmig1";
           document.getElementById("divright").className="divright1";
            document.getElementById("divbig").className="divbig1";
           code="left";
      }
      else
      {
           document.getElementById("divtree").style.visibility="visible";
           document.getElementById("divtree").style.display="block";
            document.getElementById("diviimg").className="diviimg";
           document.getElementById("divimg").className="divmig";
            document.getElementById("divright").className="divright";
           document.getElementById("divbig").className="divbig";
         
           code="fight";
      }
   	 
   }
 //   </script>