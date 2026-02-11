import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    renderHeader();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    renderNav();
    setupNavigation();
    setupSplash();
  } catch (e) {
    console.error(e);
    const splashText = document.querySelector('.splash-text');
    if (splashText) splashText.textContent = "JS Error: " + e.message;
  }
});

function setupSplash() {
  const splash = document.getElementById('splash');
  const btn = document.getElementById('enter-site');

  if (sessionStorage.getItem('splashShown') === 'true') {
    splash.style.display = 'none';
  }

  if (btn) {
    btn.style.borderColor = "#00ff00";
    setTimeout(() => { btn.style.borderColor = ""; }, 1000);
    btn.style.opacity = '1';
    btn.classList.add('visible');

    btn.addEventListener('click', () => {
      sessionStorage.setItem('splashShown', 'true');
      splash.style.opacity = '0';
      setTimeout(() => { splash.style.display = 'none'; }, 500);
    });

    const runGlitchSequence = () => {
      setTimeout(() => {
        if (!document.contains(btn)) return;
        triggerGlitch(btn);
        setTimeout(() => { setBtnText(btn, '風雅'); }, 100);
        setTimeout(() => {
          if (!document.contains(btn)) return;
          triggerGlitch(btn);
          setTimeout(() => {
            setBtnText(btn, 'OPEN');
            runGlitchSequence();
          }, 100);
        }, 1500);
      }, 3000);
    };
    runGlitchSequence();
  }
}

function setBtnText(btn, text) {
  btn.setAttribute('data-text', text);
  btn.textContent = text;
}

function triggerGlitch(btn) {
  btn.classList.remove('glitching');
  void btn.offsetWidth;
  btn.classList.add('glitching');
  setTimeout(() => { btn.classList.remove('glitching'); }, 500);
}

function renderNav() {
  const navContainer = document.querySelector('.nav-links');
  if (!navContainer) return;

  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = "#";
  a.textContent = "Welcome";
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const splash = document.getElementById('splash');
    splash.style.display = 'flex';
    void splash.offsetWidth;
    splash.style.opacity = '1';
    splash.classList.remove('hidden');
  });

  navContainer.insertBefore(li, navContainer.firstChild);
}

function renderHeader() {
  document.querySelector('.hero-name').textContent = resumeData.personalInfo.name;
  document.querySelector('.hero-title').textContent = resumeData.personalInfo.title;
  document.querySelector('.hero-tagline').textContent = resumeData.personalInfo.summary.split('.')[0] + '.';

  const placeholder = document.querySelector('.profile-placeholder');
  if (placeholder) {
    const initials = resumeData.personalInfo.name.split(' ').map(n => n[0]).join('');
    placeholder.textContent = initials;
  }
}

function renderAbout() {
  const aboutContainer = document.getElementById('about-content');
  const summaryParagraphs = resumeData.personalInfo.summary.split('. ').map(s => {
    let clean = s.trim();
    return clean ? `<p>${clean}.</p>` : '';
  }).join('');
  aboutContainer.innerHTML = summaryParagraphs;

  const highlightsContainer = document.querySelector('.about-highlights');
  if (highlightsContainer) {
    highlightsContainer.classList.add('inspo-layout');
    highlightsContainer.innerHTML = `
      <div class="info-group">
        <h4>TECHNOLOGIES:</h4>
        <p>${resumeData.skills.technical.join(', ')}</p>
      </div>
      <div class="info-group">
        <h4>TOOLS:</h4>
        <p>${resumeData.skills.tools.join(', ')}</p>
      </div>
      <div class="info-group">
        <h4>CERTIFICATIONS:</h4>
        <ul class="clean-list">
             ${resumeData.certifications.slice(0, 3).map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}

function renderExperience() {
  const container = document.getElementById('experience-list');

  resumeData.experience.forEach(job => {
    const card = document.createElement('div');
    card.className = 'exp-card';
    const companyInitial = job.company.charAt(0);

    card.innerHTML = `
      <div class="exp-logo">${companyInitial}</div>
      <div class="exp-content">
        <h3>${job.role}</h3>
        <div class="exp-role">${job.company} | ${job.duration}</div>
        <ul class="exp-desc">
          ${job.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProjects() {
  const container = document.getElementById('projects-list');
  container.className = 'projects-vertical-list';

  resumeData.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card vertical';
    const tags = determineTags(project);

    // Using reliable Giphy media CDN URLs
    let imgPath = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZ5czBvYTNqb3NtNDJoNDJoNDJoNDJoNDJoNDJoNDJoNDJoNDJoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif';
    const titleLower = project.title.toLowerCase();

    if (titleLower.includes('brain tumor')) {
      imgPath = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMMlq8TUWDbd6M/giphy.gif';
    } else if (titleLower.includes('hair') || titleLower.includes('toufai')) {
      imgPath = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPy3QZQqGtDcrja/giphy.gif';
    } else if (titleLower.includes('smoke') || titleLower.includes('iot')) {
      imgPath = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tPplGWjN0xLybiU/giphy.gif';
    } else if (titleLower.includes('crypto')) {
      imgPath = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/trN9ht5RlE3Dcwavg2/giphy.gif';
    } else if (titleLower.includes('image classification') || titleLower.includes('ai')) {
      imgPath = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1cTV1Y3F1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JqDeI2yjpSRgdh35oe/giphy.gif';
    }

    const mediaHtml = `
      <div class="project-media">
        <img src="${imgPath}" alt="${project.title}" class="project-img-preview">
      </div>
    `;

    let buttonsHtml = `<a href="#" class="btn-sm btn-code">Code</a>`;
    if (titleLower.includes('brain tumor')) {
      buttonsHtml += `<a href="#" class="btn-sm btn-video">Video</a>`;
    }

    card.innerHTML = `
      ${mediaHtml}
      <div class="project-content">
        <div class="project-header">
           <h3 class="project-title">${project.title}</h3>
           ${project.duration ? `<span class="project-date">${project.duration}</span>` : ''}
        </div>
        
        <div class="project-tags">
          ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        <ul class="project-desc">
           ${project.description.map(d => `<li>${d}</li>`).join('')}
        </ul>

        <div class="project-actions">
           ${buttonsHtml}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function determineTags(project) {
  const defaultTags = ['Tech'];
  const desc = project.description.join(' ').toLowerCase();

  if (desc.includes('python')) defaultTags.push('Python');
  if (desc.includes('ai') || desc.includes('learning')) defaultTags.push('AI/ML');
  if (desc.includes('iot')) defaultTags.push('IoT');
  if (desc.includes('blockchain')) defaultTags.push('Blockchain');
  if (desc.includes('security')) defaultTags.push('Cybersecurity');

  if (defaultTags.length > 1) defaultTags.shift();
  return defaultTags.slice(0, 3);
}

function renderSkills() {
  const techContainer = document.getElementById('tech-skills');
  const technicalSkills = [...resumeData.skills.technical, ...resumeData.skills.tools];

  technicalSkills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    techContainer.appendChild(tag);
  });

  const langContainer = document.getElementById('lang-list');
  if (langContainer && resumeData.skills.languages) {
    resumeData.skills.languages.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'lang-item';
      item.innerHTML = `<span class="lang-dot"></span>${lang}`;
      langContainer.appendChild(item);
    });
  }

  const certContainer = document.getElementById('cert-list');
  resumeData.certifications.forEach(cert => {
    const li = document.createElement('li');
    li.textContent = cert;
    certContainer.appendChild(li);
  });
}

function setupNavigation() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');

  if (btn) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}
