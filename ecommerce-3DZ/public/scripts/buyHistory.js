window.addEventListener('load',function(){

    fetch("https://api.giphy.com/v1/gifs/random?api_key=1OwNsfN2IW4v3F5lc7htqr1BbtAu1xvk&tag=purchase buy pay money&rating=g")
        .then((response) => response.json())
        .then((information) => verGif(information))
        .catch((e)=> console.log(e));

    verGif = function(information){
        console.log(information); 
        let gif = information.data.image_original_url;

        let divImagen = document.querySelector('#gif');
        divImagen.innerHTML = "<img src='" + gif +"'>";
    }

})