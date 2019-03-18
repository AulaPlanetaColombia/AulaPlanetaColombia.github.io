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
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#personalizar" aria-expanded="false" aria-controls="personalizar">
                    <i class="fa fa-caret-right"></i>
                    ¿Qué puedo ajustar en mi perfil?
                </button>
            </h2>
        </div>
        <div id="personalizar" class="collapse" aria-labelledby="tituloUno" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts reversed %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'personalizar' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
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
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#recursos" aria-expanded="false" aria-controls="recursos">
                    <i class="fa fa-caret-right"></i>
                    ¿Cómo crear o modificar una ruta de actividades en aP?
                </button>
            </h2>
        </div>
        <div id="recursos" class="collapse" aria-labelledby="tituloDos" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts reversed %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'recursos' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
                    </li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="tituloTres">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#actividades" aria-expanded="false" aria-controls="actividades">
                    <i class="fa fa-caret-right"></i>
                    ¿Cómo crear evaluaciones?
                </button>
            </h2>
        </div>
        <div id="actividades" class="collapse" aria-labelledby="tituloTres" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts reversed %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'actividades' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
                    </li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="tituloCuatro">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#tareas" aria-expanded="false" aria-controls="tareas">
                    <i class="fa fa-caret-right"></i>
                    ¿Cómo enviar actividades a los estudiantes en aP?
                </button>
            </h2>
        </div>
        <div id="tareas" class="collapse" aria-labelledby="tituloCuatro" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts reversed %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'tareas' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
                    </li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="tituloCinco">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#ce" aria-expanded="false" aria-controls="ce">
                    <i class="fa fa-caret-right"></i>
                    ¿Qué puedo hacer con el cuaderno de estudio?
                </button>
            </h2>
        </div>
        <div id="ce" class="collapse" aria-labelledby="tituloCinco" data-parent="#categorias">
            <div class="card-body">
                <ul class="fa-ul">
                {% for post in site.posts reversed %}
                    {% if post.tags.size > 0 %}
                        {% assign num_tag = '' %}
                        {% for tag in post.tags %}
                        {% if tag == 'docentes' or tag == 'ce' %}
                            {% assign num_tag = num_tag | append: 'x' %}
                        {% endif %}
                        {% endfor %}
                        {% if num_tag.size > 1 %}
                    <li>
                        <i class="fa-li fa fa-arrow-right"></i>
                        <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
                    </li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                </ul>
            </div>
        </div>
    </div>
</div>
