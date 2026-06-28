const plans = [
	{
		name: "Standard",
		description: "Perfect for single games or small events.",
		price: "$55",
		period: "per session",
		featured: false,
		badge: "",
		buttonLabel: "Get Started",
		buttonClass: "is-outline",
		features: [
			"90 Minutes Game Coverage",
			"15+ Photos Edited",
			"Digital delivery link",
			"Downloads included",
			"Standard 5-Day Delivery",
			"Full Team Coverage",
			"Commercial Usage Rights",
			"High-Res Digital Files"
		],
	},
	{
		name: "Premium",
		description: "Full event coverage for leagues and tournaments.",
		price: "$95",
		period: "per session",
		featured: true,
		badge: "Most Popular",
		buttonLabel: "Book This Plan",
		buttonClass: "is-filled",
		features: [
			"Full Game Coverage",
			"Full Gallery Edited (30+ Photos)",
			"Digital delivery link",
			"Downloads included",
			"Priority 3-Day Delivery",
			"Full Team Coverage",
			"Commercial Usage Rights",
			"High-Res Digital Files"
		],
	},
	{
		name: "Athlete Package",
		description: "Ongoing coverage for the whole season.",
		price: "$60",
		period: "per season",
		featured: false,
		badge: "",
		buttonLabel: "Get Started",
		buttonClass: "is-outline",
		features: [
			"Full Game Coverage",
			"Full Gallery Edited (10+ Photos)",
			"Digital delivery link",
			"Downloads included",
			"Priority 3-Day Delivery",
			"Individual Athlete Focus",
			"Commercial Usage Rights",
			"High-Res Digital Files"
		],
	},
];

const galleryItems = [
	{
		title: "Featured",
		image: "Assets/Futured.png",
		large: true,
		alt: "Featured photography image",
	},
	{
		title: "Sports",
		image: "Assets/sports.png",
		large: false,
		alt: "Sports photography image",
	},
	{
		title: "Event",
		image: "Assets/event.png",
		large: false,
		alt: "Event photography image",
	},
	{
		title: "Travel",
		image: "Assets/travle.png",
		large: false,
		alt: "Travel photography image",
	},
];

const contactEndpoint = window.location.protocol === "file:"
	? "http://localhost:3000/api/contact"
	: "/api/contact";

const plansGrid = document.getElementById("plansGrid");
const planSelect = document.querySelector("[data-plan-select]");
const galleryGrid = document.getElementById("galleryGrid");
const mobileMenu = document.getElementById("mobileMenu");
const formStatus = document.getElementById("formStatus");

function renderPlans() {
	if (!plansGrid) {
		return;
	}

	plansGrid.innerHTML = plans
		.map((plan) => {
			const featuredClass = plan.featured ? "is-featured" : "";

			return `
				<article class="plan-card ${featuredClass}">
					${plan.badge ? `<span class="plan-badge">${plan.badge}</span>` : ""}
					<div>
						<h3 class="plan-name">${plan.name}</h3>
						<p class="plan-desc">${plan.description}</p>
					</div>
					<div class="plan-price">${plan.price}</div>
					<p class="plan-period">${plan.period}</p>
					<div class="plan-divider"></div>
					<ul class="plan-features">
						${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
					</ul>
					<a class="plan-button ${plan.buttonClass}" href="#contact">${plan.buttonLabel}</a>
				</article>
			`;
		})
		.join("");
}

function populatePlanSelect() {
	if (!planSelect) {
		return;
	}

	const options = plans
		.map((plan) => `<option value="${plan.name}">${plan.name} - ${plan.price}</option>`)
		.join("");

	planSelect.insertAdjacentHTML("beforeend", options);
}

function renderGallery() {
	if (!galleryGrid) {
		return;
	}

	galleryGrid.innerHTML = galleryItems
		.map((item) => {
			const largeClass = item.large ? "gallery-card-large" : "";

			return `
				<article class="gallery-card ${largeClass}">
					<div class="gallery-surface">
						<img class="gallery-media" src="${item.image}" alt="${item.alt}" loading="lazy">
						<div class="gallery-fallback">${item.title}</div>
						<span>${item.title}</span>
					</div>
				</article>
			`;
		})
		.join("");

	const galleryImages = galleryGrid.querySelectorAll(".gallery-media");

	galleryImages.forEach((image) => {
		const card = image.closest(".gallery-card");

		const markLoaded = () => {
			if (card) {
				card.classList.add("is-loaded");
			}
		};

		const markMissing = () => {
			if (card) {
				card.classList.add("is-missing");
			}
		};

		if (image.complete && image.naturalWidth > 0) {
			markLoaded();
		} else {
			image.addEventListener("load", markLoaded, { once: true });
			image.addEventListener("error", markMissing, { once: true });
		}
	});
}

function toggleMenu() {
	if (!mobileMenu) {
		return;
	}

	const isOpen = mobileMenu.classList.toggle("is-open");
	const toggleButton = document.querySelector(".menu-toggle");

	if (toggleButton) {
		toggleButton.setAttribute("aria-expanded", String(isOpen));
	}
}

function closeMenu() {
	if (!mobileMenu) {
		return;
	}

	mobileMenu.classList.remove("is-open");

	const toggleButton = document.querySelector(".menu-toggle");
	if (toggleButton) {
		toggleButton.setAttribute("aria-expanded", "false");
	}
}

function handleSubmit(event) {
	event.preventDefault();

	const form = event.target;
	const button = event.target.querySelector("button");
	const originalLabel = button.textContent;
	const formData = new FormData(form);
	const payload = Object.fromEntries(formData.entries());

	if (formStatus) {
		formStatus.textContent = "Sending your message...";
	}

	button.textContent = "Sending...";
	button.disabled = true;

	fetch(contactEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})
		.then(async (response) => {
			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data.message || "Something went wrong while sending the message.");
			}

			if (formStatus) {
				formStatus.textContent = data.message || "Message sent successfully.";
			}

			form.reset();
		})
		.catch((error) => {
			if (formStatus) {
				formStatus.textContent = error.message;
			}
		})
		.finally(() => {
			button.textContent = originalLabel;
			button.disabled = false;
		});
}

renderPlans();
populatePlanSelect();
renderGallery();

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.handleSubmit = handleSubmit;
