function colaborado(id,nombres,cargo,descripcion,email,telefono,linkedin) {
    var html = ' <div class="text-center"> <h2 > '+nombres +' </h2>';
    html += '<h5 class="text-muted"> '+cargo +' </h5>';
    html +=  "<p> "+descripcion+"</p>";
    html +=  '<a href="'+linkedin+'" target="_blank" class="btn btn-outline-primary border-0"> <i class="fa-brands fa-linkedin fa-2x"></i> </a>';
    html +=  '<a class="btn btn-outline-primary border-0" href="mailto:'+email+'"> <i class="fa-solid fa-envelope fa-2x"></i> </a>';
    html +=  '<a href="#"onclick="copiarCorreo('+"'"+email+"'"+')">'+email+'</a> </div>';
    document.getElementById("descipcion").innerHTML = html;
}

function copiarCorreo(correo) {
    navigator.clipboard.writeText(correo);
}
