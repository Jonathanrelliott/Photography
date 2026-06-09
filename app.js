// ==========================================
// 1. CONFIGURATION: EDIT YOUR EMAIL & DISTINCT PRICING
// ==========================================
const YOUR_EMAIL = "elliott.jonathan.r@gmail.com"; 

// Tailor your Sports packages here
const pricingPackagesSports = [
    {
        id: "sports_pro",
        name: "Premium Team Package",
        price: 95,
        features: ["Full Game Coverage", "Full Gallery(30+ Photos)", "Priority 3-Day Delivery", "Full Team", "Commercial Usage Rights", "High-Res Digital Files" ]
    },
    {
        id: "sports_standard",
        name: "Standard Team Package",
        price: 55,
        features: ["90 Minutes Game Coverage", "15 Photos", "Standard 5-Day Delivery", "Full Team", "Commercial Usage Rights", "High-Res Digital Files"]
    },
    {
        id: "sports_athletes",
        name: "Athlete Package",
        price: 60,
        features: ["Full Game Coverage", "Full Gallery(10+ Photos)", "Priority 3-Day Delivery", "Individual Athlete Focus", "Commercial Usage Rights", "High-Res Digital Files"]
    }
];

// Tailor your Concert & Event packages here
const pricingPackagesEvents = [
    {
        id: "event_standard",
        name: "Standard Set",
        price: 80,
        features: ["Full 60-90 Minutes Coverage", "15 Photos", "Standard 5-Day Delivery", "Commercial Usage Rights", "High-Res Digital Files"]
    },
    {
        id: "event_pro",
        name: "Pro Performance",
        price: 120,
        features: ["Full Venue Coverage", "Full Gallery(25+ Photos)", "Priority 3-Day Delivery", "Commercial Usage Rights", "High-Res Digital Files"]
    }
];

// Extras that can be added inside the configuration panel calculator

// Tracks the current active base selection


// ==========================================
// 2. PACKAGES & INTERFACE GENERATION
// ==========================================
function renderAllPackageSections() {
    const sportsContainer = document.getElementById('sports-packages-container');
    const concertContainer = document.getElementById('concert-packages-container');
    
    if (sportsContainer) sportsContainer.innerHTML = buildPackageGridHTML(pricingPackagesSports, 'Sports');
    if (concertContainer) concertContainer.innerHTML = buildPackageGridHTML(pricingPackagesEvents, 'Concerts & Events');
}

function buildPackageGridHTML(packagesArray, categoryLabel) {
    let html = '';

    packagesArray.forEach(pkg => {
        html += `
            <div class="package-card">
                <div class="package-header">
                    <span class="package-name">${pkg.name}</span>
                    <span class="package-price">$${pkg.price}/${categoryLabel == 'Sports' ? 'Per Game' : 'Per Event'}</span>
                </div>
                <ul class="package-features">
                    ${pkg.features.map(f => `<li><i class="fa-solid fa-check" style="color:var(--success)"></i> ${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" onclick="launchPackageEmail('${pkg.name}', '${categoryLabel}', ${pkg.price}, \`${pkg.features.join(', ')}\`)">
                Book Now
                </button>
            </div>
        `;
    });
    return html;
}

// ==========================================
// 3. CONFIGURATION PANEL CONTROLS
// ==========================================

// ==========================================
// 4. MAILTO LAUNCH TRIGGERS
// ==========================================
function launchPackageEmail(packageName, categoryLabel, packagePrice, packageFeatures) {
    const subject = `Booking Inquiry: ${categoryLabel} - ${packageName} ($${packagePrice})`;
    
    const body = `Hi! Jon:\n` +
                 `I was looking at your website and interested in booking/getting more details about the ${packageName} package!\n` +
                 `Some of the features included are ${packageFeatures}\n` +
                 `Here is a little bit about what I’m looking for: \bYOU NEED TO FILL IN THIS INFORMATION \r` +
                 `- Your Name:\n` +
                 `- Date & Time of Event:\n` +
                 `- Location / Venue Name:\n` +
                 `- Additional Details (teams, artists, eta):\n\n` +
                 `What are the next steps and get this locked in? \n` +
                 `Thanks Jon!`;

    window.location.href = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function sendDirectEmail() {
    window.location.href = `mailto:${YOUR_EMAIL}?subject=General Inquiry`;
}

function launchCreateEmail(packageName, categoryLabel, packagePrice, packageFeatures) {
    const subject = `Booking Inquiry: : I need something different `;
    
    const body = `Hi! Jon:\n` +
                 `I was looking at your website and I’m interested in something different as your plans don’t have all my needs.\n` +
                 `Here is a  bit about what I’m looking for: \bYOU NEED TO FILL IN THIS INFORMATION \r` +
                 `- Your Name:\n` +
                 `- Date & Time of Event:\n` +
                 `- Location / Venue Name:\n` +
                 `- Additional Details (like how many games, how long something is, how many photos I need, how fast you need the photos by, eta):\n\n` +
                 `What are the next steps and get this locked in? \n` +
                 `Thanks Jon!`;

    window.location.href = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ==========================================
// 5. INSTAGRAM LINK DEEP HANDLER
// ==========================================
function setupInstagramDeepLink() {
    const instagramBtn = document.getElementById('instagram-link');
    if (!instagramBtn) return;

    const username = "jon.e_photo"; 

    instagramBtn.addEventListener('click', function(e) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            e.preventDefault();
            window.location.href = `instagram://user?username=${username}`;

            setTimeout(function() {
                window.open(`https://instagram.com/${username}`, '_blank');
            }, 1500);
        }
    });
}

// Initialize layout structure
renderAllPackageSections();
setupInstagramDeepLink();