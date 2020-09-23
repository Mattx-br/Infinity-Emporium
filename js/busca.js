function redirect(value) {
               
    if(value == 'bolos' || value == 'bolo' || value == 'BOLO' || value == 'BOLOS')
    {
        window.location = "bolos.html";
        }
    else
    {
      if(value == 'cupcakes' || value == 'CUPCAKES' || value == 'CUPCAKE' || value == 'cupcake'){
        window.location.href = "cupcakes.html";
      }

      else{
        if(value == 'donut' || value == 'biscoito' || value == 'brigadeiro' || value == 'macaron' || value== 'bomba'){
          window.location.href = "pagina3.html"
        }
      }    
    }
}