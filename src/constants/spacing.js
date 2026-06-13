export const SPACING = {
	XS: 4,
	SM: 8,
	MD: 12,
	LG: 16,
	XL: 22,
	XXL: 32,
	XXXL: 48,

	xs: 4, // inline gaps, icon padding
	sm: 8, // dot gaps, small internal padding
	md: 16, // standard screen padding
	lg: 24, // section spacing
	xl: 32, // large section gaps
	xxl: 48, // hero/splash vertical spacing
};

export const RADIUS = {
	TAG: 4,
	BADGE: 8,
	FIELD: 12,
	CARD: 16,
	PILL: 999,

	button: 8, // PrimaryButton border radius
	input: 12, // form fields (SignIn, SignUp)
	card: 16, // service cards, dashboard cards
	sheet: 24, // bottom sheets, modals
	device: 30, // device frame border radius
	dot: 100, // slider dots, indicators
};

export const FRAME = {
	width: 390,
	height: 844,
	borderRadius: 30,
};

// WCAG 2.5.5 — minimum 48px tap target on all touchables
export const HIT_SLOP = {
	top: 8,
	bottom: 8,
	left: 8,
	right: 8,
};
