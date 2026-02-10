import { resumeData } from './data.js';
// import './style.css'; // CSS is now linked in index.html for raw deployment

// Setup DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();

  renderNav(); // Dynamic Nav
  setupNavigation();
  setupSplash();
});

function setupSplash() {
  const splash = document.getElementById('splash');
  const btn = document.getElementById('enter-site');

  if (btn) {
    btn.addEventListener('click', () => {
      splash.classList.add('hidden');
    });

    // Glitch Text Loop (OPEN <-> FUGA)
    // The CSS animation runs on a 3s loop.
    // The glitch visual effect happens from 85% to 92% of [0, 3s].
    // That means at ~2.55s into the 3s cycle, the glitch starts.
    // We want to swap the text right as the glitch starts to hide the transition.

    // We start the interval slightly offset if we want perfection, but 3000ms loop is fine.
    // Let's fire the first swap after 2.6s, then every 3s.

    // Start the unequal loop: 3s OPEN, 1s FUGA
    // We initiate the glitch effect during the transitions.

    // Unified Glitch Loop
    const startLoop = () => {
      // 1. Initial State: OPEN. Wait 3s.
      setTimeout(() => {
        // Trigger glitch transition
        triggerGlitch(btn);

        // Swap to FUGA shortly after glitch starts (50ms)
        setTimeout(() => {
          setBtnText(btn, '風雅');
        }, 50);

        // 2. State: FUGA. Wait 1.5s.
        setTimeout(() => {
          // Trigger glitch transition back
          triggerGlitch(btn);

          // Swap back to OPEN shortly after glitch starts (50ms)
          setTimeout(() => {
            setBtnText(btn, 'OPEN');

            // Restart Loop
            startLoop();
          }, 50);

        }, 1500); // Shorter duration for Japanese text

      }, 3000); // Longer duration for English text
    };

    // Kickoff
    setTimeout(() => {
      btn.classList.add('visible'); // Lock opacity to 1
      startLoop();
    }, 2000); // Wait for initial fadeIn (1s delay + 1s duration)
  }

  // Fallback: Remove from DOM after transition to save resources
  splash.addEventListener('transitionend', () => {
    if (splash.classList.contains('hidden')) {
      splash.style.display = 'none';
    }
  });
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
  }, 500); // Increased to 500ms to cover the 0.4s CSS animation
}

function renderNav() {
  const navContainer = document.querySelector('.nav-links');
  if (!navContainer) return;

  // Clear existing static links if we want to fully dynamic (optional, but cleaner)
  // For now, let's just append the special button or recreate the list

  // Let's keep specific links but add the "Welcome" / "Show Intro" one
  // The HTML currently has: About, Experience, Projects, Skills, Contact

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

    splash.classList.remove('hidden');
    // Re-trigger animations if needed, but removing hidden might be enough
    // Logic in setupSplash handles the hiding
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
    highlightsContainer.classList.add('inspo-layout'); // Add specific class for styling
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
      imgPath = 'public/assets/project_brain.png';
    } else if (titleLower.includes('hair') || titleLower.includes('toufai')) {
      imgPath = 'public/assets/project_hair.png';
    } else if (titleLower.includes('smoke') || titleLower.includes('iot')) {
      imgPath = 'public/assets/project_iot.png';
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
