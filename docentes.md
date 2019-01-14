---
layout: page
title: Recursos digitales para docentes
subtitle: Instructivos y ayudas de aulaPlaneta para docentes
---

Despliegue cada una de las categorías haciendo clic sobre el título para ver las ayudas disponibles.

<div class="accordion" id="categorias">
    <div class="card">
        <div class="card-header" id="tituloUno">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#iniciar" aria-expanded="false" aria-controls="iniciar">
                    <i class="fa fa-caret-right"></i>
                    Iniciar con aulaPlaneta
                </button>
            </h2>
        </div>
        <div id="iniciar" class="collapse" aria-labelledby="tituloUno" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'iniciar' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="" class="post-title">{{ post.title }}</a>
                    </li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="tituloDos">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#intermedio" aria-expanded="false" aria-controls="intermedio">
                    <i class="fa fa-caret-right"></i>
                    Collapsible Group Item #2
                </button>
            </h2>
        </div>
        <div id="intermedio" class="collapse" aria-labelledby="tituloDos" data-parent="#categorias">
            <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="tituloTres">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#avanzado" aria-expanded="false" aria-controls="avanzado">
                    <i class="fa fa-caret-right"></i>
                    Collapsible Group Item #3
                </button>
            </h2>
        </div>
        <div id="avanzado" class="collapse" aria-labelledby="tituloTres" data-parent="#categorias">
            <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
        </div>
    </div>
</div>
