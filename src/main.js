import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    renderHeader();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    setupBackButton();
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
        setTimeout(() => { setBtnText(btn, '風雅'); }, 200);
        setTimeout(() => {
          if (!document.contains(btn)) return;
          triggerGlitch(btn);
          setTimeout(() => {
            setBtnText(btn, 'OPEN');
            runGlitchSequence();
          }, 200);
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
  setTimeout(() => { btn.classList.remove('glitching'); }, 600);
}

function setupBackButton() {
  const backBtn = document.getElementById('back-to-splash');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Clear session storage
      sessionStorage.removeItem('splashShown');

      // Get splash and show it
      const splash = document.getElementById('splash');
      splash.style.display = 'flex';
      splash.style.opacity = '1';

      // Get the button and reset it
      const btn = document.getElementById('enter-site');
      if (btn) {
        // Make sure button is visible
        btn.style.opacity = '1';
        btn.classList.add('visible');
        btn.setAttribute('data-text', 'OPEN');
        btn.textContent = 'OPEN';
      }
    });
  }
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

    // Using locally downloaded GIFs
    let imgPath = 'public/assets/ai-classifier.gif'; // Default
    const titleLower = project.title.toLowerCase();

    if (titleLower.includes('brain tumor')) {
      imgPath = 'public/assets/brain-tumor.gif';
    } else if (titleLower.includes('hair') || titleLower.includes('toufai')) {
      imgPath = 'public/assets/hair-toufai.gif';
    } else if (titleLower.includes('smoke') || titleLower.includes('iot')) {
      imgPath = 'public/assets/iot-smoke.gif';
    } else if (titleLower.includes('crypto')) {
      imgPath = 'public/assets/crypto-forecast.gif';
    } else if (titleLower.includes('image classification') || titleLower.includes('ai')) {
      imgPath = 'public/assets/ai-classifier.gif';
    }

    const mediaHtml = `
      <div class="project-media">
        <img src="${imgPath}" alt="${project.title}" class="project-img-preview" loading="lazy">
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
