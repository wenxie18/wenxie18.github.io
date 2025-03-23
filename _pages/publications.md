---
layout: publications
permalink: /publications/
title: Publications
nav: true
nav_order: 2.5
---

<div class="publications-section">
  {% assign sorted_publications = site.data.publications | sort: "year" | reverse %}
  {% for pub in sorted_publications %}
    <div class="publication-item">
      <div class="publication-content">
        <div class="publication-title">
          {{ pub.title }}
        </div>
        <div class="publication-authors">
          {{ pub.authors }}
        </div>
        <div class="publication-meta">
          <span class="publication-journal">{{ pub.journal }}</span>
          <span class="publication-year">{{ pub.year }}</span>
          {% if pub.scholar_link %}
            <a href="{{ pub.scholar_link }}" target="_blank" class="publication-link">Google Scholar</a>
          {% endif %}
        </div>
        {% if pub.abstract %}
          <div class="abstract-section">
            <button class="abstract-toggle" onclick="toggleAbstract(this)">
              <span class="abstract-icon">▼</span>
              <span class="abstract-text">Show Abstract</span>
            </button>
            <div class="abstract-content" style="display: none;">
              {{ pub.abstract }}
            </div>
          </div>
        {% endif %}
        {% if pub.notes %}
          <div class="publication-notes">
            {% for note in pub.notes %}
              <div class="note-item">{{ note }}</div>
            {% endfor %}
          </div>
        {% endif %}
        {% if pub.figures.size > 0 %}
          <div class="publication-figures">
            <div class="figure-container">
              {% for fig in pub.figures %}
                <div class="figure-item">
                  <img src="{{ fig.image }}" alt="{{ fig.caption }}" class="publication-figure">
                  <div class="figure-caption">{{ fig.caption }}</div>
                </div>
              {% endfor %}
            </div>
          </div>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>

<script>
function toggleAbstract(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.abstract-icon');
  const text = button.querySelector('.abstract-text');
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.textContent = '▼';
    text.textContent = 'Hide Abstract';
  } else {
    content.style.display = 'none';
    icon.textContent = '▶';
    text.textContent = 'Show Abstract';
  }
}
</script> 