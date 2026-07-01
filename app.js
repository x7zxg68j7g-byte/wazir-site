/* ==========================================================================
   NAVIGATION & GLOBAL ACTIONS
   ========================================================================== */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  highlightNav();
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
}

// Close mobile nav on click of link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Active Link Highlight on Scroll
function highlightNav() {
  const sections = document.querySelectorAll('section, main');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   INTERACTIVE HUB TAB ROUTING
   ========================================================================== */
function switchHubTab(event, tabId) {
  // Remove active from all tabs
  const tabBtns = document.querySelectorAll('.hub-tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));

  // Add active to current tab
  event.currentTarget.classList.add('active');

  // Hide all content panes
  const panes = document.querySelectorAll('.hub-content-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show selected pane
  document.getElementById(tabId).classList.add('active');
}

// Casebook PDF Download Execution
function simulateDownload() {
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `
    <svg style="width:18px; height:18px; fill:currentColor; animation: spin 1s linear infinite; margin-right:0.5rem;" viewBox="0 0 24 24">
      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
    </svg> Preparing Casebook 4.0...`;
  
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  setTimeout(() => {
    btn.innerHTML = `✓ Downloading Casebook 4.0...`;
    btn.style.background = 'rgb(74, 222, 128)';
    btn.style.color = '#030a16';
    
    // Perform actual file download
    const link = document.createElement('a');
    link.href = 'Wazir_Casebook_4.0.pdf';
    link.download = 'Wazir_Casebook_4.0.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }, 1500);
}

/* ==========================================================================
   THE HOUSE OF WAZIR - COLOSSEUM INSPECTOR LOGIC
   ========================================================================== */
const verticalsData = {
  'casebook': {
    title: 'Casebook Vertical',
    subtitle: "Every great strategy starts with a question. A casebook just hands you the right ones to ask!",
    desc: "Our annual Consulting Casebook is the Bible of preparation at IIM Rohtak. Compiled and reviewed by alumni working in consulting roles, it connects students to an in-house consulting network.",
    bullets: [
      { title: "50+ Cases", text: "Curated real interview cases cracked at top strategy firms." },
      { title: "30+ Guesstimates & 40+ Frameworks", text: "Step-by-step methodologies and mathematical trees." },
      { title: "20+ Industry Overviews", text: "Deep briefings covering key sectors and value chains." },
      { title: "800+ Alumni Network", text: "Connecting the batch with seniors in top global practices." }
    ]
  },
  'clinic': {
    title: 'APEX - The Consulting Clinic',
    subtitle: "You don't learn strategy from slides — you learn it by solving problems.",
    desc: "Our apex pro-bono consulting practice. We connect student teams with small-and-medium enterprises (SMEs) and government departments to deliver actionable strategic roadmaps.",
    bullets: [
      { title: "Client Sourcing & Audit", text: "Identify high-potential SMEs and govt. bodies and assess business models." },
      { title: "In-Depth Diagnosis", text: "Conduct business analysis through site visits, interviews, and audits." },
      { title: "Expert Collaborations", text: "Partner with industry leaders to formulate tactical GTM and growth plans." },
      { title: "Impact & Execution Tracking", text: "Monitor implementation steps and record tangible client improvements." }
    ]
  },
  'editorial': {
    title: 'Editorial Vertical',
    subtitle: "Knowledge has to be improved, challenged, and increased constantly.",
    desc: "Structuring campus intelligence. We don't believe in just publishing editorials; we strive to make them a part of our culture, sharpening placement readiness.",
    bullets: [
      { title: "Guesstimate Guruwaar", text: "Weekly editorial driving calculations culture, with 60+ GGs published." },
      { title: "The Monthly Muse", text: "Monthly case interview journal covering mock transcripts, with 25+ MMs." },
      { title: "Industry Overview", text: "Fortnightly reports detailing macro trends across sectors, with 20+ IOs." },
      { title: "Limited Editions Insights", text: "Fast-reads like Strat Square, Strategy Insights, and Strategy Mutations." }
    ]
  },
  'events': {
    title: 'Events Vertical',
    subtitle: "Events aren't games of chance — they're games of choice. Think like a Wazir.",
    desc: "Managing national case challenges and strategy hackathons. We partner with top hosting platforms to drive massive student engagement and corporate visibility.",
    bullets: [
      { title: "Consultant of the Year (COTY)", text: "Our flagship intra-college crucible, with 8 editions conducted." },
      { title: "Legacy Events", text: "Director's Roundtable 2.0, The Consulting Carousel, and Impostors Gambit." },
      { title: "Passion Events", text: "Cinematic Seconds, Product Playground, Stratlyst, and Prodthink Quest." },
      { title: "Scale & Outreach", text: "1M+ impressions, 24,000+ registrations, and 100+ national level competitions." }
    ]
  },
  'relations': {
    title: 'External Relations Vertical',
    subtitle: "Success in strategy lies in doing and connecting.",
    desc: "We forge impactful collaborations and real-world experiences, gathering live projects and boutique knowledge sessions for the batch.",
    bullets: [
      { title: "Live Projects Sourcing", text: "Securing exclusive internships and project runs for Wazir and batch coordinates." },
      { title: "9K Average Stipend", text: "Delivering value-added internships with tangible student compensation." },
      { title: "Knowledge Sessions", text: "Inviting full-time consultants from top boutiques and management firms." },
      { title: "Campus Connect", text: "Facilitating inter-IIM and IIT knowledge exchanges and joint workshops." }
    ]
  },
  'pr': {
    title: 'Public Relations Vertical',
    subtitle: "Visibility is strategy. If the world doesn't see you, you don't exist.",
    desc: "The PR vertical is the 'Mother of Verticals' — the connective tissue that amplifies every initiative across Wazir. From LinkedIn thought-leadership to Instagram engagement, we craft narratives that position Wazir as a national consulting brand.",
    bullets: [
      { title: "Social Media Strategy", text: "End-to-end content calendar management across LinkedIn, Instagram, and campus channels with 1M+ cumulative impressions." },
      { title: "Brand Identity & Design", text: "Crafting a cohesive visual identity — from event posters and casebook covers to digital templates and merchandise." },
      { title: "Content & Storytelling", text: "Long-form posts, reels, carousels, and behind-the-scenes narratives that humanize the club and drive engagement." },
      { title: "Media & Outreach", text: "Coordinating press coverage, alumni spotlights, and cross-club collaborations to amplify Wazir's visibility nationally." }
    ]
  }
};

function inspectVertical(id) {
  const data = verticalsData[id];
  if (!data) return;

  // Highlight selected pillar
  const pillars = document.querySelectorAll('.temple-pillar');
  pillars.forEach(p => p.classList.remove('active'));

  // Find the clicked pillar element
  // Since inspectVertical is called inline, we can find the pillar based on index or onclick match
  const clickedPillar = Array.from(pillars).find(p => p.getAttribute('onclick').includes(id));
  if (clickedPillar) clickedPillar.classList.add('active');

  const panel = document.getElementById('vertical-detail-panel');
  
  // Format bullets HTML
  let bulletsHtml = '';
  data.bullets.forEach(b => {
    bulletsHtml += `
      <div class="v-bullet-item">
        <div class="v-bullet-icon">✓</div>
        <div class="v-bullet-text">
          <h4>${b.title}</h4>
          <p>${b.text}</p>
        </div>
      </div>
    `;
  });

  panel.innerHTML = `
    <div class="glass-card vertical-detail-card" style="animation: fadeIn 0.4s ease forwards;">
      <div class="vertical-detail-header">
        <h3>${data.title}</h3>
        <span>Operations</span>
      </div>
      <h4 style="font-weight:400; color:var(--text-secondary); font-size:1rem; margin-bottom:1rem; font-style:italic;">"${data.subtitle}"</h4>
      <p class="vertical-detail-desc">${data.desc}</p>
      <div class="vertical-detail-bullets-grid">
        ${bulletsHtml}
      </div>
    </div>
  `;
}


/* ==========================================================================
   FRAMEWORKS POPUPS / MODALS
   ========================================================================== */
const frameworksData = {
  'profit-tree': {
    title: 'Profitability Framework',
    subtitle: 'Base diagnostic tree for identifying business performance decay',
    desc: 'The profitability framework is the cornerstone of case preparation. It utilizes a MECE (Mutually Exclusive, Collectively Exhaustive) structure to divide a business\'s profits into revenue and cost metrics to pinpoint why a business is losing money.',
    structure: `
      <div style="margin-top: 1.5rem;">
        <h4 style="color:var(--brand-accent); margin-bottom:0.75rem;">Structure breakdown:</h4>
        <div style="background:rgba(0,0,0,0.25); padding:1rem; border-radius:8px; font-family:var(--font-header); font-size:0.9rem; border:1px solid var(--border-color);">
          <strong>Profit</strong> = Revenue - Cost<br>
          &nbsp;&nbsp;↳ <strong>Revenue</strong> = Volume × Price<br>
          &nbsp;&nbsp;↳ <strong>Cost</strong> = Fixed Costs + Variable Costs (Volume × Unit Cost)
        </div>
        <h4 style="color:var(--brand-accent); margin-top:1.5rem; margin-bottom:0.5rem;">When to apply:</h4>
        <p style="font-size:0.9rem;">Apply this whenever a business reports declining profitability, stagnant margins, or when you need to audit operational cost segments before launching a new venture.</p>
      </div>
    `
  },
  'bcg-matrix': {
    title: 'Growth-Share Matrix (BCG)',
    subtitle: 'Strategic product portfolio classification tool',
    desc: 'Developed by Boston Consulting Group, this model plots business units or products along two axes: Market Growth Rate (vertical) and Relative Market Share (horizontal) to guide investment strategies.',
    structure: `
      <div style="margin-top: 1.5rem;">
        <h4 style="color:var(--brand-accent); margin-bottom:0.75rem;">Portfolio Quadrants:</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; border:1px solid var(--border-color); text-align:left;">
          <tr style="background:rgba(255,255,255,0.03); border-bottom:1px solid var(--border-color);">
            <th style="padding:0.75rem;">Quadrant</th>
            <th style="padding:0.75rem;">Attributes</th>
            <th style="padding:0.75rem;">Recommended Action</th>
          </tr>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:0.75rem; font-weight:600; color:var(--text-accent);">Stars</td>
            <td style="padding:0.75rem;">High Growth, High Share</td>
            <td style="padding:0.75rem;">Invest to sustain growth.</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:0.75rem; font-weight:600; color:var(--brand-accent);">Question Marks</td>
            <td style="padding:0.75rem;">High Growth, Low Share</td>
            <td style="padding:0.75rem;">Evaluate: scale up or divest.</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:0.75rem; font-weight:600; color:var(--text-secondary);">Cash Cows</td>
            <td style="padding:0.75rem;">Low Growth, High Share</td>
            <td style="padding:0.75rem;">Harvest cash flows to fund Stars.</td>
          </tr>
          <tr>
            <td style="padding:0.75rem; font-weight:600; color:var(--text-muted);">Dogs</td>
            <td style="padding:0.75rem;">Low Growth, Low Share</td>
            <td style="padding:0.75rem;">Divest or restructure.</td>
          </tr>
        </table>
      </div>
    `
  },
  'market-entry': {
    title: 'Market Entry Framework',
    subtitle: 'Strategic roadmap for expansion feasibility',
    desc: 'A comprehensive entry framework maps qualitative and quantitative factors to evaluate if a client should expand into a new geography, product segment, or vertical.',
    structure: `
      <div style="margin-top: 1.5rem;">
        <h4 style="color:var(--brand-accent); margin-bottom:0.75rem;">Four Core Pillars of Analysis:</h4>
        <ol style="padding-left:1.25rem; font-size:0.9rem; display:flex; flex-direction:column; gap:0.5rem;">
          <li><strong>Market Attractiveness:</strong> Evaluate total addressable market (TAM), compound growth rate (CAGR), competitors, and entry barriers.</li>
          <li><strong>Financial Viability:</strong> Estimate initial capital expenditure (CAPEX), operating costs (OPEX), projected revenues, NPV, and payback periods.</li>
          <li><strong>Operational Feasibility:</strong> Assess supply chain, regulatory landscape, distribution channels, and talent acquisition.</li>
          <li><strong>Strategic Fit:</strong> Examine synergy with parent business, impact on current brand equity, and joint venture/acquisition routes.</li>
        </ol>
      </div>
    `
  }
};

const modal = document.getElementById('framework-modal');
const modalContent = document.getElementById('modal-content-area');

function showFrameworkModal(id) {
  const data = frameworksData[id];
  if (!data) return;

  modalContent.innerHTML = `
    <h3 class="text-gradient" style="font-size:1.8rem; margin-bottom:0.25rem;">${data.title}</h3>
    <h4 style="font-weight:400; color:var(--text-secondary); font-size:0.95rem; margin-bottom:1.5rem;">${data.subtitle}</h4>
    <p style="font-size:0.95rem; line-height:1.6;">${data.desc}</p>
    ${data.structure}
    <div style="margin-top:2.5rem; display:flex; justify-content:flex-end;">
      <button class="btn btn-secondary" onclick="closeFrameworkModal()">Close</button>
    </div>
  `;
  modal.style.display = 'flex';
}

function closeFrameworkModal() {
  modal.style.display = 'none';
}

// Click outside to close modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeFrameworkModal();
  }
});


/* ==========================================================================
   DYNAMIC CONSULTING CASE STUDY SIMULATOR ENGINE
   ========================================================================== */
const casesData = {
  ev_charging: {
    title: "Case 1: Guesstimate (EV Charging Stations in Mumbai)",
    prompt: {
      type: "Guesstimate Challenge",
      text: "Estimate the annual market size of Electric Vehicle (EV) charging stations in Mumbai."
    },
    step1: {
      title: "Step 1: Clarifying the Scope",
      question: "Before jumping into numbers, you must align scope with the interviewer. Which question is critical to scope this guesstimate properly?",
      choices: [
        { key: "A", text: "Should we consider AC slow chargers vs DC fast chargers?", status: "incorrect", feedback: "While interesting, commercial charging station infrastructure is driven by business/public deployment, not specifically charging standards details." },
        { key: "B", text: "Are we estimating public commercial charging stations, or does this include private home chargers?", status: "correct", feedback: "Excellent! Knowing whether we target private residential chargers, public commercial hubs, or fleet depots is critical for structuring the demand model." },
        { key: "C", text: "Should we limit the estimate to specific brands of EV cars operating in Mumbai?", status: "incorrect", feedback: "The model of EV cars (Tesla vs local brands) doesn't change the core infrastructure math for counting charging stations." }
      ]
    },
    step2: {
      title: "Step 2: Choosing Your Approach",
      question: "Now choose the optimal formula tree to model the total number of public charging stations in Mumbai.",
      choices: [
        { key: "A", text: "Total Mumbai Vehicles × EV Penetration Rate × Average cost of electricity.", status: "incorrect", feedback: "This does not account for the frequency of usage or utilization factors of individual charging stations, which dictates how many are needed." },
        { key: "B", text: "(Total EVs in Mumbai × Avg Charges needed/week) ÷ (Avg Capacity of a Station charges/week).", status: "correct", feedback: "Correct! Structuring via supply capacity and vehicle charging demand is the standard MECE approach for fleet capacity planning." },
        { key: "C", text: "Total Mumbai Area ÷ Average grid layout capacity per square kilometer.", status: "incorrect", feedback: "This focuses strictly on land footprint rather than transport/vehicle demand, which is harder to estimate accurately." }
      ]
    },
    step3: {
      title: "Step 3: Quantifying the Drivers",
      question: "Fill in the structured assumptions below. We've pre-filled some standard base assumptions. Complete the calculation.",
      formula: "Stations = (EVs × Freq) / Capacity",
      variables: [
        { label: "1. Estimated Total EV Vehicles in Mumbai", id: "calc-evs", value: 60000, readonly: true },
        { label: "2. Average Charges required per EV per week", id: "calc-freq", value: 2, readonly: false },
        { label: "3. Max weekly charge capacity per Station", id: "calc-capacity", value: 80, readonly: false }
      ],
      resultLabel: "Enter your calculated Stations",
      hint: "Hint: Multiply EV count by charge frequency, then divide by weekly station capacity.",
      math: (v1, v2, v3) => Math.round((v1 * v2) / v3)
    },
    step4: {
      title: "Guesstimate Cracked!",
      executiveSummary: "Mumbai's public charging network requires roughly <strong>1,500 active stations</strong> to support a private EV fleet of 60,000, assuming a utilization rate of ~50% (approx 80 charges per week per station base capacity)."
    }
  },
  q_commerce: {
    title: "Case 2: Profitability (Q-Commerce Dark Store)",
    prompt: {
      type: "Profitability Challenge",
      text: "A quick-commerce startup in Bangalore is facing declining profitability despite rising order volumes. Diagnose the root cause."
    },
    step1: {
      title: "Step 1: Clarifying the Scope",
      question: "Which of the following questions is most critical to narrow down where the profitability leak is happening?",
      choices: [
        { key: "A", text: "Are competitor startups also facing similar drops in profit margins in Bangalore?", status: "incorrect", feedback: "Competitor data is helpful, but we must first isolate whether this is an internal unit economics leak (revenue side vs. cost side) for our specific client." },
        { key: "B", text: "Has the average order value (AOV) declined, or have the delivery/dark-store operational costs per order increased?", status: "correct", feedback: "Excellent! This isolates the unit margin drivers. If cost per order went up while order value stayed flat, the margin is squeezed." },
        { key: "C", text: "Which product categories (groceries, electronics) are driving the rising order volume?", status: "incorrect", feedback: "Category mix matters, but is secondary to understanding the overall cost and revenue trend lines per order." }
      ]
    },
    step2: {
      title: "Step 2: Choosing Your Approach",
      question: "Choose the optimal formula tree to calculate the net operating profit of a single dark store.",
      choices: [
        { key: "A", text: "Revenue = Total Orders × Avg Ticket Price × Conversion Rate.", status: "incorrect", feedback: "This only models top-line revenue, ignoring fixed dark store operations and variable delivery costs." },
        { key: "B", text: "Profit = (Average Order Value - Cost of Goods Sold - Delivery Cost) × Total Orders - Dark Store Fixed Cost.", status: "correct", feedback: "Correct! This separates variable order margins from fixed real estate operations, allowing true operating leverage calculation." },
        { key: "C", text: "Profit = Gross Margin % × Marketing spend per customer acquisition.", status: "incorrect", feedback: "This is a customer lifetime value model, not an operating store profitability model." }
      ]
    },
    step3: {
      title: "Step 3: Quantifying the Drivers",
      question: "Let's calculate the operating profit/loss of a Bangalore dark store with these current monthly assumptions:",
      formula: "Monthly Profit = (AOV - COGS - Delivery) × Orders - Fixed Cost",
      variables: [
        { label: "1. Average Order Value (AOV)", id: "calc-aov", value: 400, readonly: true },
        { label: "2. Cost of Goods Sold (COGS)", id: "calc-cogs", value: 280, readonly: true },
        { label: "3. Delivery Cost per Order", id: "calc-delivery", value: 60, readonly: false },
        { label: "4. Dark Store Fixed Operational Cost", id: "calc-fixed", value: 120000, readonly: true },
        { label: "5. Total Monthly Orders", id: "calc-orders", value: 10000, readonly: true }
      ],
      resultLabel: "Enter monthly net operating profit (₹)",
      hint: "Hint: Variable Margin per order is ₹400 - ₹280 - Delivery Cost. Multiply by Orders and subtract Fixed Cost.",
      math: (v1, v2, v3, v4, v5) => ((v1 - v2 - v3) * v5) - v4
    },
    step4: {
      title: "Profitability Case Cracked!",
      executiveSummary: "The dark store generates a net operating profit of <strong>₹4,80,000</strong> per month with a ₹60 delivery cost. Note that if delivery costs surge to ₹80, profit drops by 40% to ₹2,80,000, showing high sensitivity to logistics efficiency."
    }
  },
  ev_battery: {
    title: "Case 3: Market Entry (EV Cell Production)",
    prompt: {
      type: "Market Entry Strategy",
      text: "A global EV battery manufacturer wants to enter the Indian 2-wheeler EV market. Determine if they should enter."
    },
    step1: {
      title: "Step 1: Clarifying the Scope",
      question: "Before calculating numbers, what strategic question is vital to understand the client's entry motives?",
      choices: [
        { key: "A", text: "What is the client's financial/market share target, and is there a preference for organic vs inorganic entry?", status: "correct", feedback: "Excellent! Clarifying exit criteria, return targets, and entry modes (like JV vs self-built plant) is the first step of any market entry framework." },
        { key: "B", text: "Should we analyze the EV car market instead of 2-wheelers?", status: "incorrect", feedback: "The client specified 2-wheelers, which is currently the largest volume EV segment in India. We should stick to the brief unless it's proven non-viable." },
        { key: "C", text: "How long does it take to charge a standard 2-wheeler battery pack?", status: "incorrect", feedback: "Technical charging speed is a product feature, not a strategic market entry gate question." }
      ]
    },
    step2: {
      title: "Step 2: Choosing Your Approach",
      question: "Select the MECE (Mutually Exclusive, Collectively Exhaustive) framework to evaluate the market entry decision.",
      choices: [
        { key: "A", text: "Market attractiveness (size, growth) → Competitive Landscape → Client Capabilities → Financial Viability.", status: "correct", feedback: "Correct! This covers all four pillars of market entry strategy logically." },
        { key: "B", text: "Marketing Mix (Product, Price, Place, Promotion).", status: "incorrect", feedback: "The 4Ps is a tactical marketing framework, not a strategic macro-level market entry feasibility framework." },
        { key: "C", text: "Porter's Five Forces analysis only.", status: "incorrect", feedback: "Five forces analyzes industry attractiveness, but neglects client internal capability and detailed project financials." }
      ]
    },
    step3: {
      title: "Step 3: Quantifying the Drivers",
      question: "Estimate the client's year 1 operating profits assuming a 5% target market share:",
      formula: "Year 1 Profit = (Market Size × EV Penetration × Share × Margin/Pack) - Setup Investment",
      variables: [
        { label: "1. Total 2W Market Size (Units)", id: "calc-msize", value: 5000000, readonly: true },
        { label: "2. EV Penetration Rate (%)", id: "calc-penetration", value: 10, readonly: true },
        { label: "3. Target Market Share (%)", id: "calc-share", value: 5, readonly: true },
        { label: "4. Profit Margin per battery pack (₹)", id: "calc-margin", value: 5000, readonly: true },
        { label: "5. Year 1 Setup & Regulatory Investment (₹)", id: "calc-setup", value: 100000000, readonly: false }
      ],
      resultLabel: "Enter Year 1 Operating Profit (₹)",
      hint: "Hint: Year 1 Sales = 5M × 10% × 5% = 25,000 battery packs. Multiply by margin (₹5,000) and subtract Setup Investment.",
      math: (v1, v2, v3, v4, v5) => (v1 * (v2 / 100) * (v3 / 100) * v4) - v5
    },
    step4: {
      title: "Market Entry Case Cracked!",
      executiveSummary: "With a ₹100,000,000 (10 Cr) setup investment, Year 1 operating profit is <strong>₹25,000,000</strong> (2.5 Cr) on sales of 25,000 packs. The payback period looks extremely positive (under 4 years), supporting entry."
    }
  }
};

let simState = {
  currentStep: 1,
  answers: { step1: null, step2: null, step3: null },
  stepValidity: { step1: false, step2: false, step3: false }
};

let activeCaseId = "ev_charging";

const simBtnBack = document.getElementById('sim-btn-back');
const simBtnNext = document.getElementById('sim-btn-next');

function changeActiveCase(caseId) {
  activeCaseId = caseId;
  simState = {
    currentStep: 1,
    answers: { step1: null, step2: null, step3: null },
    stepValidity: { step1: false, step2: false, step3: false }
  };
  renderActiveStep();
}

function renderActiveStep() {
  const caseData = casesData[activeCaseId];
  if (!caseData) return;

  const promptBox = document.getElementById("sim-prompt-box");
  if (promptBox) {
    promptBox.innerHTML = `
      <h4>${caseData.prompt.type}</h4>
      <p>"${caseData.prompt.text}"</p>
    `;
  }

  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`sim-step-${i}-indicator`);
    if (indicator) {
      indicator.classList.remove('active', 'completed');
      if (i < simState.currentStep) {
        indicator.classList.add('completed');
      } else if (i === simState.currentStep) {
        indicator.classList.add('active');
      }
    }
  }

  if (simBtnBack) {
    simBtnBack.disabled = simState.currentStep === 1;
    if (simState.currentStep === 4) {
      simBtnNext.innerHTML = 'Restart';
      simBtnNext.disabled = false;
      simBtnBack.style.display = 'none';
    } else {
      simBtnNext.innerHTML = 'Next Step';
      simBtnBack.style.display = 'inline-flex';
      simBtnNext.disabled = !simState.stepValidity[`step${simState.currentStep}`];
    }
  }

  const dynamicPane = document.getElementById("sim-dynamic-pane");
  if (!dynamicPane) return;

  if (simState.currentStep === 1 || simState.currentStep === 2) {
    const stepKey = `step${simState.currentStep}`;
    const stepData = caseData[stepKey];
    const hasAnswered = simState.answers[stepKey] !== null;
    const isCorrect = simState.answers[stepKey] === true;

    let choicesHTML = "";
    stepData.choices.forEach(c => {
      let extraClass = "";
      if (hasAnswered) {
        if (c.status === "correct") {
          extraClass = "correct selected";
        } else if (c.status === "incorrect" && !isCorrect) {
          extraClass = "incorrect selected";
        }
      }
      choicesHTML += `
        <button class="sim-choice-btn ${extraClass}" onclick="selectDynamicChoice(this, ${simState.currentStep}, '${c.status}', '${c.feedback.replace(/'/g, "\\'")}')">
          <div class="choice-marker">${c.key}</div>
          <span>${c.text}</span>
        </button>
      `;
    });

    dynamicPane.innerHTML = `
      <div class="sim-step-content active">
        <h3 class="sim-question-title text-gradient">${stepData.title}</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">${stepData.question}</p>
        <div class="sim-choices-grid">
          ${choicesHTML}
        </div>
        <div class="sim-feedback-box" id="sim-feedback-${simState.currentStep}" style="display: ${hasAnswered ? 'block' : 'none'};"></div>
      </div>
    `;

    if (hasAnswered) {
      const fbBox = document.getElementById(`sim-feedback-${simState.currentStep}`);
      const selectedChoice = stepData.choices.find(c => isCorrect ? c.status === "correct" : c.status === "incorrect");
      if (selectedChoice && fbBox) {
        fbBox.className = `sim-feedback-box ${selectedChoice.status}`;
        fbBox.innerHTML = `<strong>${selectedChoice.status.toUpperCase()}:</strong> ${selectedChoice.feedback}`;
      }
    }

  } else if (simState.currentStep === 3) {
    const stepData = caseData.step3;
    let variablesHTML = "";
    stepData.variables.forEach(v => {
      variablesHTML += `
        <div class="calc-input-group">
          <label>${v.label}</label>
          <input type="number" id="${v.id}" class="calc-input-field" value="${v.value}" ${v.readonly ? 'readonly' : ''} oninput="calculateDynamicStep()">
        </div>
      `;
    });

    dynamicPane.innerHTML = `
      <div class="sim-step-content active">
        <h3 class="sim-question-title text-gradient">${stepData.title}</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">${stepData.question}</p>
        
        <div class="sim-calculator-container">
          <div class="calc-workspace">
            <div class="calc-title">Assumptions & Variables</div>
            <div class="calc-inputs-grid">
              ${variablesHTML}
            </div>
          </div>
          
          <div class="calc-workspace">
            <div class="calc-title">Formula Output</div>
            <div class="calc-formula-display">
              ${stepData.formula}
            </div>
            <div class="calc-inputs-grid">
              <div class="calc-input-group">
                <label>${stepData.resultLabel}</label>
                <input type="number" id="calc-result" class="calc-input-field" placeholder="Calculate & Enter" oninput="calculateDynamicStep()">
              </div>
              <p style="font-size: 0.8rem;" id="calc-hint-msg">${stepData.hint}</p>
            </div>
          </div>
        </div>
        <div class="sim-feedback-box" id="sim-feedback-3" style="display: none;"></div>
      </div>
    `;

    calculateDynamicStep();

  } else if (simState.currentStep === 4) {
    const stepData = caseData.step4;
    const correctCount = Object.values(simState.answers).filter(val => val === true).length;
    const percentage = Math.round((correctCount / 3) * 100);

    dynamicPane.innerHTML = `
      <div class="sim-step-content active">
        <div class="sim-success-content">
          <div class="success-badge-icon">✓</div>
          <h3>${stepData.title}</h3>
          <p>You have demonstrated structured consulting logic. Here is your evaluation report:</p>
          
          <div class="sim-score-summary">
            <div class="sim-score-num" id="sim-final-score">${percentage}%</div>
            <div class="sim-score-lbl">Logical Alignment Score</div>
          </div>
          
          <p style="font-size: 0.95rem; max-width: 550px; margin: 0 auto 2.5rem;">
            <strong>Executive Summary:</strong> ${stepData.executiveSummary}
          </p>
        </div>
      </div>
    `;
  }
}

function selectDynamicChoice(button, stepNum, status, feedbackText) {
  const choicesGrid = button.parentElement;
  const siblingBtns = choicesGrid.querySelectorAll('.sim-choice-btn');
  
  siblingBtns.forEach(btn => {
    btn.className = 'sim-choice-btn';
  });

  button.classList.add('selected');
  button.classList.add(status);
  
  const feedbackBox = document.getElementById(`sim-feedback-${stepNum}`);
  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.className = `sim-feedback-box ${status}`;
    feedbackBox.innerHTML = `<strong>${status.toUpperCase()}:</strong> ${feedbackText}`;
  }

  simState.answers[`step${stepNum}`] = status === 'correct';
  
  if (status === 'correct') {
    simState.stepValidity[`step${stepNum}`] = true;
    simBtnNext.disabled = false;
  } else {
    simState.stepValidity[`step${stepNum}`] = false;
    simBtnNext.disabled = true;
  }
}

function calculateDynamicStep() {
  const caseData = casesData[activeCaseId];
  if (!caseData || !caseData.step3) return;

  const stepData = caseData.step3;
  const vals = stepData.variables.map(v => {
    const input = document.getElementById(v.id);
    return input ? (parseFloat(input.value) || 0) : 0;
  });

  const calcResult = document.getElementById("calc-result");
  if (!calcResult) return;

  const userVal = parseFloat(calcResult.value);
  const expectedValue = stepData.math(...vals);

  const feedbackBox = document.getElementById('sim-feedback-3');
  if (!feedbackBox) return;
  feedbackBox.style.display = 'block';

  if (!isNaN(userVal) && userVal === expectedValue) {
    feedbackBox.className = 'sim-feedback-box correct';
    feedbackBox.innerHTML = `<strong>CORRECT:</strong> Math verified! Calculation equals exactly ${expectedValue.toLocaleString()}.`;
    simState.stepValidity.step3 = true;
    simBtnNext.disabled = false;
    simState.answers.step3 = true;
  } else {
    feedbackBox.className = 'sim-feedback-box incorrect';
    feedbackBox.innerHTML = `<strong>INCORRECT:</strong> Value mismatch. Expected answer is ${expectedValue.toLocaleString()}. Check your arithmetic!`;
    simState.stepValidity.step3 = false;
    simBtnNext.disabled = true;
    simState.answers.step3 = false;
  }
}

function nextSimStep() {
  if (simState.currentStep === 4) {
    simState = {
      currentStep: 1,
      answers: { step1: null, step2: null, step3: null },
      stepValidity: { step1: false, step2: false, step3: false }
    };
    renderActiveStep();
    return;
  }

  if (simState.stepValidity[`step${simState.currentStep}`]) {
    simState.currentStep++;
    renderActiveStep();
  }
}

function prevSimStep() {
  if (simState.currentStep > 1) {
    simState.currentStep--;
    renderActiveStep();
  }
}


/* ==========================================================================
   CLIENT CLINIC INTAKE FORM HANDLING
   ========================================================================== */
const intakeForm = document.getElementById('clinic-intake-form');
const successOverlay = document.getElementById('form-success');

function handleFormSubmit(event) {
  event.preventDefault();
  const submitBtn = intakeForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg style="width:16px; height:16px; fill:currentColor; animation: spin 1s linear infinite; margin-right:0.5rem;" viewBox="0 0 24 24">
      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
    </svg> Submitting Brief...`;

  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const org = document.getElementById('form-org').value;
  const reason = document.getElementById('form-reason').value;
  const message = document.getElementById('form-message').value;
  fetch("https://formsubmit.co/ajax/snc@iimrohtak.ac.in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      subject: `New Wazir Website Collaboration Brief: ${org}`,
      organization: org,
      inquiry_type: reason,
      message: message
    })
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.ok) {
      successOverlay.classList.add('active');
    } else {
      console.log(response);
      alert("Submission failed: " + (json.message || "Unknown error"));
    }
  })
  .catch((error) => {
    console.log(error);
    alert("Form submission failed due to a network error.");
  })
  .then(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  });
}

function resetForm() {
  intakeForm.reset();
  successOverlay.classList.remove('active');
}

// Initial UI triggers
document.addEventListener('DOMContentLoaded', () => {
  highlightNav();
  renderActiveStep();
  // Open the Casebook vertical details by default in the temple inspector
  inspectVertical('casebook');
});

// Mobile Collapsible Toggles
let casesExpanded = false;
function toggleCases() {
  const btn = document.getElementById('toggle-cases-btn');
  const cards = document.querySelectorAll('.case-study-card.mobile-collapsible');
  casesExpanded = !casesExpanded;
  
  cards.forEach(card => {
    if (casesExpanded) {
      card.classList.remove('mobile-hidden');
    } else {
      card.classList.add('mobile-hidden');
    }
  });

  btn.innerHTML = casesExpanded ? 'Show Less Cases' : 'Show More Cases';
}

let teamExpanded = false;
function toggleTeam() {
  const btn = document.getElementById('toggle-team-btn');
  const cards = document.querySelectorAll('.team-card.mobile-collapsible');
  teamExpanded = !teamExpanded;
  
  cards.forEach(card => {
    if (teamExpanded) {
      card.classList.remove('mobile-hidden');
    } else {
      card.classList.add('mobile-hidden');
    }
  });

  btn.innerHTML = teamExpanded ? 'Show Less' : 'Show Full Team';
}
