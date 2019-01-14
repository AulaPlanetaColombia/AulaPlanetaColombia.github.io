---
layout: page
title: Recursos digitales para estudiantes
subtitle: Instructivos y ayudas de aulaPlaneta para estudiantes
---
<div class="card">
    <div class="card-header">
        Haga clic sobre el título correspondiente para abrir la ayuda.
    </div>
    <div class="card-body">
        <ul class="fa-ul">
        {% for post in site.posts %}
            {% if post.tags.size > 0 %}
                {% for tag in post.tags %}
                    {% if tag == 'estudiantes' %}
            <li>
                <i class="fa-li fa fa-arrow-right"></i>
                <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
            </li>
                    {% endif %}
                {% endfor %}
            {% endif %}
        {% endfor %}
        </ul>
    </div>
</div>