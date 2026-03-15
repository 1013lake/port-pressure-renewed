export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  price: string;
  description: string;
  benefits: string[];
  process: string[];
}

export const services: ServiceData[] = [
  {
    slug: "driveway-cement-cleaning",
    name: "Driveway & Cement Cleaning",
    shortDescription:
      "Remove years of grime, oil stains, and buildup from concrete and paved surfaces.",
    image: "/driveway.jpg",
    price: "$0.40 / sq ft",
    description:
      "Over time, driveways and cement surfaces accumulate oil stains, tire marks, mold, mildew, and ground-in dirt that regular hosing can't touch. Our professional pressure washing service uses commercial-grade equipment calibrated specifically for concrete and paved surfaces. We adjust pressure levels and use surface cleaners to deliver a deep, even clean without damaging the surface. Whether it's your home driveway, a commercial parking area, or a warehouse floor, we'll restore it to like-new condition. A clean driveway doesn't just look great — it also prevents slip hazards from algae and extends the life of your concrete by removing corrosive buildup.",
    benefits: [
      "Removes oil stains, tire marks, and embedded dirt",
      "Eliminates mold, mildew, and algae growth",
      "Prevents surface degradation and cracking",
      "Improves curb appeal and property value",
      "Reduces slip hazards on wet surfaces",
    ],
    process: [
      "Inspect the surface for cracks, stains, and problem areas",
      "Pre-treat oil stains and heavy buildup with degreaser",
      "Pressure wash using a commercial surface cleaner for even results",
      "Detail edges, corners, and expansion joints",
      "Final rinse and inspection",
    ],
  },
  {
    slug: "heavy-machinery-cleaning",
    name: "Heavy Machinery Cleaning",
    shortDescription:
      "Industrial-grade cleaning for excavators, loaders, and heavy equipment.",
    image: "/980clean.jpg",
    price: "$150/hr (4hr min)",
    description:
      "Heavy machinery operates in the toughest environments — mud, grease, hydraulic fluid, and debris build up fast and can mask mechanical issues, accelerate corrosion, and reduce resale value. Our industrial pressure washing service is designed for excavators, loaders, dump trucks, forestry equipment, and more. We use high-flow, high-pressure systems with high-pressure capability to cut through caked-on mud and grease without damaging hydraulic lines, electrical components, or painted surfaces. Regular cleaning also makes it easier for mechanics to spot leaks and wear, keeping your fleet in top shape. Based on Vancouver Island, we understand the logging, mining, and construction industries that rely on this equipment.",
    benefits: [
      "Removes caked mud, grease, and hydraulic fluid",
      "Helps identify leaks and mechanical wear early",
      "Protects against rust and corrosion",
      "Maintains resale and trade-in value",
      "Meets job site and inspection cleanliness requirements",
    ],
    process: [
      "Assess equipment and identify sensitive components to protect",
      "Pre-soak heavy buildup areas with industrial degreaser",
      "High-pressure pressure wash all surfaces methodically",
      "Detail undercarriage, tracks, and hard-to-reach areas",
      "Final rinse and quality check",
    ],
  },
  {
    slug: "exterior-house-wash",
    name: "Exterior House Wash",
    shortDescription:
      "Gentle yet thorough cleaning of siding, stucco, and exterior walls.",
    image: "/siding.png",
    price: "Starting at $250",
    description:
      "Your home's exterior takes a beating from Vancouver Island's wet climate. Rain, humidity, and shade create the perfect conditions for algae, mold, mildew, and moss to take hold on siding, stucco, and painted surfaces. Left unchecked, these organisms can cause permanent staining, wood rot, and paint failure. Our exterior house wash uses a soft-wash technique — lower pressure combined with biodegradable cleaning solutions — to safely remove buildup without damaging your siding, trim, or windows. This approach is safe for vinyl, wood, hardie board, stucco, and painted surfaces. The result is a home that looks freshly painted at a fraction of the cost. We also take care to protect your landscaping and surrounding areas during the wash.",
    benefits: [
      "Safely removes algae, mold, mildew, and moss",
      "Prevents wood rot and paint deterioration",
      "Restores your home's original appearance",
      "Safe for all siding types including vinyl, wood, and stucco",
      "Protects landscaping with eco-friendly solutions",
    ],
    process: [
      "Walk the perimeter to assess siding condition and staining",
      "Protect landscaping, windows, and fixtures as needed",
      "Apply biodegradable soft-wash cleaning solution",
      "Allow dwell time for the solution to break down organisms",
      "Low-pressure rinse from top to bottom for a streak-free finish",
    ],
  },
  {
    slug: "deck-fence-cleaning",
    name: "Deck & Fence Cleaning",
    shortDescription:
      "Restore the natural beauty of your wood or composite outdoor surfaces.",
    image: "/wood.png",
    price: "$0.40 / sq ft",
    description:
      "Decks and fences are exposed to the elements year-round, and on Vancouver Island that means constant moisture, moss, algae, and UV damage. Wood surfaces turn grey, composite decking gets slippery with algae, and fences lose their color and character. Our deck and fence cleaning service uses carefully calibrated pressure and fan tips to clean wood and composite surfaces without splintering, gouging, or damaging the grain. We remove moss, algae, mildew, and grey weathering to reveal the natural beauty underneath. For wood surfaces, a clean deck is also the perfect preparation for staining or sealing — the finish will penetrate better and last longer on a properly cleaned surface. We handle cedar, pressure-treated lumber, composite decking, and vinyl fencing.",
    benefits: [
      "Removes moss, algae, and grey weathering",
      "Restores natural wood color and grain",
      "Prepares surfaces for staining or sealing",
      "Extends the lifespan of your deck and fence",
      "Eliminates slippery algae buildup for safety",
    ],
    process: [
      "Inspect wood condition, checking for soft spots or damage",
      "Pre-treat heavy moss and algae patches",
      "Pressure wash with fan tips calibrated for the surface type",
      "Clean between boards and around posts and railings",
      "Final rinse and dry inspection for consistent results",
    ],
  },
  {
    slug: "bin-dumpster-cleaning",
    name: "Bin & Dumpster Pad Cleaning",
    shortDescription:
      "Eliminate odors and bacteria from garbage bins and commercial dumpster areas.",
    image: "/bluetrash.jpg",
    price: "$30 per bin",
    description:
      "Garbage bins and dumpster pads are some of the most overlooked cleaning tasks for both homes and businesses. Over time, food waste, liquids, and organic matter create a breeding ground for bacteria, maggots, and rodents — not to mention the smell. Our bin and dumpster pad cleaning service uses high-pressure pressure washing combined with commercial-grade sanitizing agents to eliminate bacteria, break down organic residue, and neutralize odors. For residential customers, we offer single-bin cleaning or a full 3-bin package. For commercial clients, we provide initial deep cleaning of dumpster pads followed by affordable monthly maintenance to keep your property clean, compliant, and pest-free. Regular cleaning also extends the life of your bins and keeps your property looking professional.",
    benefits: [
      "Kills bacteria and eliminates foul odors",
      "Prevents pest attraction — flies, maggots, and rodents",
      "Removes stuck-on food waste and organic buildup",
      "Keeps commercial properties compliant with health standards",
      "Affordable monthly maintenance plans available",
    ],
    process: [
      "Position bins for cleaning with proper drainage",
      "High-pressure pressure wash interior and exterior surfaces",
      "Apply commercial-grade sanitizing and deodorizing agent",
      "Scrub stubborn residue and rinse thoroughly",
      "Return bins to their original location",
    ],
  },
  {
    slug: "graffiti-removal",
    name: "Graffiti Removal",
    shortDescription:
      "Professional removal of graffiti from brick, concrete, and painted surfaces.",
    image: "/graffiti.jpg",
    price: "Starting at $150",
    description:
      "Graffiti on your property sends the wrong message to customers, tenants, and neighbors. The longer it stays, the harder it is to remove — and it often attracts more vandalism. Our graffiti removal service combines high-pressure washing with specialized chemical strippers designed for the specific paint type and surface material. Whether it's spray paint on brick, marker on concrete, or paint on a commercial facade, we match our approach to the surface to remove the graffiti without causing damage or ghosting. We work on brick, concrete block, natural stone, painted walls, metal, and more. For properties in high-risk areas, we can also apply anti-graffiti coatings that make future removal quick and easy — the paint washes right off instead of bonding to the surface.",
    benefits: [
      "Removes spray paint, markers, and stickers",
      "Safe for brick, concrete, stone, and painted surfaces",
      "Prevents ghost marks with proper technique",
      "Discourages repeat vandalism with quick response",
      "Anti-graffiti protective coatings available",
    ],
    process: [
      "Identify paint type and surface material",
      "Test cleaning approach on a small area first",
      "Apply appropriate chemical stripper and allow dwell time",
      "High-pressure wash to remove loosened graffiti",
      "Apply anti-graffiti coating if requested",
    ],
  },
  {
    slug: "walkway-brick-cleaning",
    name: "Walkway & Brick Cleaning",
    shortDescription:
      "Bring walkways, patios, and brick surfaces back to their original look.",
    image: "/brick.jpg",
    price: "$0.40 / sq ft",
    description:
      "Brick walkways, patios, and retaining walls add character to any property, but they're also magnets for moss, algae, weeds, and ground-in dirt — especially in Vancouver Island's damp climate. Over time, the surface darkens, joints fill with organic growth, and the brick loses its original color and texture. Our walkway and brick cleaning service uses commercial surface cleaners and precisely controlled pressure to lift dirt and organisms from the brick face and joints without damaging the mortar or dislodging pavers. We clean all types of brick and paver surfaces including clay brick, concrete pavers, natural stone walkways, and retaining walls. The result is a dramatic transformation that makes your outdoor spaces look new again. For paver surfaces, we can also re-sand joints after cleaning to prevent future weed growth.",
    benefits: [
      "Removes deep-set moss, algae, and weeds from joints",
      "Restores original brick color and texture",
      "Safe for mortar joints and paver installations",
      "Prevents trip hazards from slippery organic growth",
      "Joint re-sanding available for paver surfaces",
    ],
    process: [
      "Assess surface type and condition of mortar/joints",
      "Pre-treat moss and algae with cleaning solution",
      "Pressure wash with commercial surface cleaner",
      "Detail joints and edges for a thorough clean",
      "Re-sand paver joints if needed and final rinse",
    ],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    shortDescription:
      "Clear out debris and buildup to keep your gutters flowing properly.",
    image: "/gutter.jpg",
    price: "Starting at $150",
    description:
      "Clogged gutters are more than an eyesore — they're a serious threat to your home's foundation, fascia, and landscaping. When gutters fill with leaves, pine needles, moss, and decomposed organic matter, water overflows and pools around your foundation, seeps behind fascia boards, and can even cause basement flooding or crawlspace moisture problems. On Vancouver Island, heavy rainfall and surrounding trees mean gutters can clog quickly, especially in fall and winter. Our gutter cleaning service removes all debris from gutters and downspouts, flushes the system to ensure proper flow, and cleans the exterior face of your gutters to remove black streaks and staining. We also inspect for damage, sagging, or improper pitch so you can address small issues before they become expensive repairs.",
    benefits: [
      "Prevents water damage to foundation and fascia",
      "Removes leaves, needles, moss, and decomposed debris",
      "Flushes downspouts to ensure proper drainage",
      "Cleans exterior gutter staining and black streaks",
      "Includes visual inspection for damage and pitch issues",
    ],
    process: [
      "Set up safe ladder access around the roofline",
      "Remove debris from all gutters by hand and scoop",
      "Flush gutters and downspouts with water to verify flow",
      "Pressure wash exterior gutter faces to remove staining",
      "Inspect for damage, leaks, and sagging — report findings",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
