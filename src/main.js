import { resumeData } from './data.js';

// Setup DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  try {
    renderHeader();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();

    renderNav(); // Dynamic Nav
    setupNavigation();
    setupSplash();
  } catch (e) {
    console.error(e);
    // Emergency Error Display for User Feedback
    const splashText = document.querySelector('.splash-text');
    if (splashText) splashText.textContent = "JS Error: " + e.message;
    // alert("Critical Error: " + e.message); // Commented out to be less intrusive unless needed
  }
});

function setupSplash() {
  const splash = document.getElementById('splash');
  const btn = document.getElementById('enter-site');

  if (btn) {
    // 1. Click Handler
    btn.addEventListener('click', () => {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    });

    // 2. Specific Timing Loop (Open -> Fuga -> Open)
    // 3s wait (OPEN), then Glitch -> Fuga, 1.5s wait (Fuga), then Glitch -> Open.

    const runGlitchSequence = () => {
      // Phase 1: Wait 3000ms holding "OPEN"
      setTimeout(() => {
        // Trigger Glitch Effect
        triggerGlitch(btn);

        // Swap Text to Japanese shortly after glitch starts
        setTimeout(() => {
          setBtnText(btn, '風雅');
        }, 100);

        // Phase 2: Wait 1500ms holding "Japanese"
        setTimeout(() => {
          // Trigger Glitch Effect Back
          triggerGlitch(btn);

          // Swap Text back to OPEN
          setTimeout(() => {
            setBtnText(btn, 'OPEN');
            // RESTART LOOP
            runGlitchSequence();
          }, 100);

        }, 1500);

      }, 3000);
    };

    // Initial Start
    runGlitchSequence();
  }
}

function setBtnText(btn, text) {
  btn.setAttribute('data-text', text);
  btn.textContent = text;
}

function triggerGlitch(btn) {
  btn.classList.remove('glitching');
  void btn.offsetWidth; // Trigger reflow to restart animation
  btn.classList.add('glitching');
  setTimeout(() => {
    btn.classList.remove('glitching');
  }, 500);
}

function renderNav() {
  const navContainer = document.querySelector('.nav-links');
  if (!navContainer) return;

  // We'll create a new LI for "Welcome"
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = "#";
  a.textContent = "Welcome";
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const splash = document.getElementById('splash');
    splash.style.display = 'flex'; // Ensure it's not display:none

    // Force reflow
    void splash.offsetWidth;

    splash.style.opacity = '1'; // Reset opacity
    splash.classList.remove('hidden');
  });

  // Prepend to list
  navContainer.insertBefore(li, navContainer.firstChild);
}

function renderHeader() {
  // Update Hero Content
  document.querySelector('.hero-name').textContent = resumeData.personalInfo.name;
  document.querySelector('.hero-title').textContent = resumeData.personalInfo.title;
  document.querySelector('.hero-tagline').textContent = resumeData.personalInfo.summary.split('.')[0] + '.';

  // Update Profile Initials (if placeholder exists)
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

  // Transform Right Column to "Inspo" layout: Languages, Tools, Courses/Certs
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

    // Create Logo Placeholder (Initial of company)
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
  container.className = 'projects-vertical-list'; // Switch to vertical layout class

  resumeData.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card vertical';

    // Determine tags
    const tags = determineTags(project);

    // Select Image based on title keywords
    let imgPath = 'public/assets/default_project.png'; // Fallback
    const titleLower = project.title.toLowerCase();

    if (titleLower.includes('brain tumor')) {
      imgPath = 'public/assets/user_img_0.png';
    } else if (titleLower.includes('smoke') || titleLower.includes('iot')) {
      imgPath = 'public/assets/user_img_1.png';
    } else if (titleLower.includes('image classification') || titleLower.includes('ai')) {
      imgPath = 'public/assets/user_img_4.png';
    } else if (titleLower.includes('hair')) {
      imgPath = 'public/assets/project_hair.png';
    }

    const mediaHtml = `
      <div class="project-media">
        <img src="${imgPath}" alt="${project.title}" class="project-img-preview">
      </div>
    `;

    // Conditional Buttons
    let buttonsHtml = `<a href="#" class="btn-sm btn-code">Code</a>`;

    // Add Video button specifically for the Brain Tumor project (checking title keyword)
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

  // Remove default if others found and allow max 3
  if (defaultTags.length > 1) defaultTags.shift();
  return defaultTags.slice(0, 3);
}

function renderSkills() {
  const techContainer = document.getElementById('tech-skills');

  // Technical = Technical + Tools
  // Excluding spoken Languages based on user feedback
  const technicalSkills = [...resumeData.skills.technical, ...resumeData.skills.tools];

  technicalSkills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    techContainer.appendChild(tag);
  });

  // Render Spoken Languages
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
  // Mobile Menu Toggle
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');

  if (btn) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}
